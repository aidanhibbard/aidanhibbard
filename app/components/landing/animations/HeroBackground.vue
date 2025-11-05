<template>
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 grid-background">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border/40"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
        />
      </svg>
    </div>

    <div className="absolute inset-0 pulse-lines">
      <div className="pulse-line pulse-line-1" />
      <div className="pulse-line pulse-line-2" />
      <div className="pulse-line pulse-line-3" />
      <div className="pulse-line pulse-line-4" />
      <div className="pulse-line pulse-line-5" />

      <div className="pulse-line-vertical pulse-line-v-1" />
      <div className="pulse-line-vertical pulse-line-v-2" />
      <div className="pulse-line-vertical pulse-line-v-3" />
    </div>
  </div>
</template>
