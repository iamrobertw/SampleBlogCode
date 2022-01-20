import { useRouter } from "next/router";

export default function PreviousPage() {
  const router = useRouter();

  return (
    <div className="">
      <button
        type="button"
        onClick={() => router.back()}
        className="hidden pt-3 pb-2 pl-6 font-bold text-green-500 transition duration-500 border-none rounded outline-none select-none lg:block pr-7 back goBack"
      >
        <svg
          className="inline-block w-6 h-6 mb-1 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Go Back</span>
      </button>
    </div>
  );
}
