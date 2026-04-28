"use server";

// Server action to query the Sentiment Analysis Model (Model 1)
export async function analyzeSentiment(text: string, rating: number = 5) {
  try {
    const computeNode = process.env.ML_COMPUTE_NODE_URL || "http://localhost:8080";
    const apiEndpoint = `${computeNode}/api/analyze_review`;
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, rating }),
      signal: AbortSignal.timeout(3000)
    });
    
    if (!res.ok) {
       console.log("Sentiment API not responding or error returned.");
       return { success: false, fallback: true, sentiment_score: Math.round(rating * 20) }; 
    }
    const data = await res.json();
    return { success: true, ...data };
  } catch (err) {
    console.error("Sentiment ML connection failed:", err);
    // If backend isn't running, realistically calculate exact mathematical sentiment derived from rating bounds.
    return { success: false, fallback: true, sentiment_score: Math.round(rating * 20) }; 
  }
}

// Server action to query the Smart Size Recommender (Model 3)
export async function predictSize(weight: number, height: number, age: number, brand: string = "") {
  try {
    const computeNode = process.env.ML_COMPUTE_NODE_URL || "http://localhost:8080";
    const apiEndpoint = `${computeNode}/api/recommend_size`;
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, height, age, brand })
    });
    
    if (!res.ok) return { success: false };
    const data = await res.json();
    return { success: true, ...data };
  } catch (err) {
    console.error("Size ML connection failed:", err);
    return { success: false };
  }
}

// Server action to query the Photo Model (Model 3 Extra / Balanced API)
export async function analyzeVisualFit(formData: FormData) {
  try {
    const computeNode = process.env.ML_COMPUTE_NODE_URL || "http://localhost:8080";
    const apiEndpoint = `${computeNode}/api/analyze_photo`;

    // Forward the multipart form data directly to the local python API
    const res = await fetch(apiEndpoint, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) return { success: false, status: await res.text() };
    const data = await res.json();
    return { success: true, ...data };
  } catch (err) {
    console.error("Photo ML connection failed:", err);
    return { success: false };
  }
}
