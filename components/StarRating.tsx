interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 18 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star - 0.5 <= rating;
        return (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`half-${star}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#FFC633" />
                <stop offset="50%" stopColor="#E0E0E0" />
              </linearGradient>
            </defs>
            <path
              d="M9 1.5L11.1206 6.45492L16.5 7.11352L12.525 10.8293L13.6085 16.1504L9 13.5L4.39155 16.1504L5.475 10.8293L1.5 7.11352L6.87938 6.45492L9 1.5Z"
              fill={
                filled
                  ? "#FFC633"
                  : half
                  ? `url(#half-${star})`
                  : "#E0E0E0"
              }
            />
          </svg>
        );
      })}
    </div>
  );
}
