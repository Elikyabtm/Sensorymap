const SenseBadge = ({ type, variant = "contour", size = 32 }) => {
  const renderSVG = () => {
    // LIGHT CONTOUR
    if (type === "light" && variant === "contour") {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_light_contour)">
            <circle cx="16" cy="15.5" r="14.5" fill="#9A7AC1" stroke="white" strokeWidth="1.5" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.5 15.8C17.5 16.2 17.4 16.5 17.2 16.8C17 17.1 16.8 17.4 16.5 17.6C16.2 17.8 15.9 17.9 15.5 17.9C15.1 17.9 14.7 17.9 14.4 17.7C14.1 17.5 13.6 17.2 13.4 16.9C13.2 16.6 13 16.1 13 15.8C13 15.5 13.2 14.9 13.4 14.6C13.6 14.3 14 14 14.4 13.8C14.8 13.6 15.1 13.4 15.5 13.4C15.9 13.4 16.4 13.5 16.7 13.7C17 13.9 17.1 14.3 17.3 14.7C17.5 15 17.5 15.5 17.5 15.8Z"
              fill="#EBE4F3"
            />
            <path
              d="M10.3 6.7C11.3 8.3 12.4 9.9 12.8 11.8C12.8 12 12.6 12.2 12.4 12.2C11.8 12.1 11.6 11.3 11.4 10.9C10.8 9.6 10 8.4 9.4 7.2C9.2 6.9 9.3 6.5 9.6 6.4C9.9 6.2 10.2 6.3 10.3 6.7Z"
              fill="#EBE4F3"
            />
            <path
              d="M21.6 7.2L20.3 9.6C19.9 10.5 19.3 11.2 18.9 12.1C18.7 12.5 18.2 12.6 17.8 12.4C17.4 12.2 17.2 11.7 17.5 11.3C18 10.5 18.7 9.8 19.2 9L20.9 6.7C21.2 6.2 21.9 6.6 21.6 7.1V7.2Z"
              fill="#EBE4F3"
            />
            <path
              d="M15.9 5.5L16 8.3C16 9.3 16.1 10.2 16.1 11.1C16.1 11.5 15.8 11.8 15.5 11.8C15.1 11.8 14.8 11.5 14.8 11.1C14.8 10.2 14.7 9.3 14.7 8.3V5.5C14.7 4.8 15.9 4.8 15.9 5.5Z"
              fill="#EBE4F3"
            />
            <path
              d="M9.5 23.4C9.7 22.5 10.4 21.6 10.8 20.9C11.3 20 11.7 19.2 12.1 18.3C12.5 17.5 13.7 18.1 13.4 18.9C12.6 20.1 11.8 21.4 11 22.6C10.7 23 10.1 24.2 9.6 23.7C9.5 23.6 9.5 23.5 9.5 23.4Z"
              fill="#EBE4F3"
            />
            <path
              d="M20.5 23.9L18.9 21.5C18.4 20.7 18 19.8 17.5 19C17.3 18.7 17.4 18.3 17.7 18.1C18 17.9 18.4 18 18.6 18.3C19.1 19.1 19.4 20 19.9 20.9L21.5 23.3C21.9 23.9 20.9 24.5 20.5 23.9Z"
              fill="#EBE4F3"
            />
            <path
              d="M15.2 24.9C15 23.4 14.9 21.9 14.8 20.5C14.8 19.9 14.6 18.4 15.6 18.5C15.8 18.5 16 18.7 16 18.9C16.3 20.9 16.2 22.9 16 24.9C15.9 25.4 15.2 25.4 15.2 24.9Z"
              fill="#EBE4F3"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_light_contour"
              x="0"
              y="0"
              width="32"
              height="32"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_light_contour" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_light_contour" result="shape" />
            </filter>
          </defs>
        </svg>
      )
    }

    // LIGHT SANS CONTOUR
    if (type === "light" && variant === "sansContour") {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_light_sans)">
            <circle cx="16" cy="15.5" r="15" fill="#9A7AC1" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.5 15.8C17.5 16.2 17.4 16.5 17.2 16.8C17 17.1 16.8 17.4 16.5 17.6C16.2 17.8 15.9 17.9 15.5 17.9C15.1 17.9 14.7 17.9 14.4 17.7C14.1 17.5 13.6 17.2 13.4 16.9C13.2 16.6 13 16.1 13 15.8C13 15.5 13.2 14.9 13.4 14.6C13.6 14.3 14 14 14.4 13.8C14.8 13.6 15.1 13.4 15.5 13.4C15.9 13.4 16.4 13.5 16.7 13.7C17 13.9 17.1 14.3 17.3 14.7C17.5 15 17.5 15.5 17.5 15.8Z"
              fill="#EBE4F3"
            />
            <path
              d="M10.3 6.7C11.3 8.3 12.4 9.9 12.8 11.8C12.8 12 12.6 12.2 12.4 12.2C11.8 12.1 11.6 11.3 11.4 10.9C10.8 9.6 10 8.4 9.4 7.2C9.2 6.9 9.3 6.5 9.6 6.4C9.9 6.2 10.2 6.3 10.3 6.7Z"
              fill="#EBE4F3"
            />
            <path
              d="M21.6 7.2L20.3 9.6C19.9 10.5 19.3 11.2 18.9 12.1C18.7 12.5 18.2 12.6 17.8 12.4C17.4 12.2 17.2 11.7 17.5 11.3C18 10.5 18.7 9.8 19.2 9L20.9 6.7C21.2 6.2 21.9 6.6 21.6 7.1V7.2Z"
              fill="#EBE4F3"
            />
            <path
              d="M15.9 5.5L16 8.3C16 9.3 16.1 10.2 16.1 11.1C16.1 11.5 15.8 11.8 15.5 11.8C15.1 11.8 14.8 11.5 14.8 11.1C14.8 10.2 14.7 9.3 14.7 8.3V5.5C14.7 4.8 15.9 4.8 15.9 5.5Z"
              fill="#EBE4F3"
            />
            <path
              d="M9.5 23.4C9.7 22.5 10.4 21.6 10.8 20.9C11.3 20 11.7 19.2 12.1 18.3C12.5 17.5 13.7 18.1 13.4 18.9C12.6 20.1 11.8 21.4 11 22.6C10.7 23 10.1 24.2 9.6 23.7C9.5 23.6 9.5 23.5 9.5 23.4Z"
              fill="#EBE4F3"
            />
            <path
              d="M20.5 23.9L18.9 21.5C18.4 20.7 18 19.8 17.5 19C17.3 18.7 17.4 18.3 17.7 18.1C18 17.9 18.4 18 18.6 18.3C19.1 19.1 19.4 20 19.9 20.9L21.5 23.3C21.9 23.9 20.9 24.5 20.5 23.9Z"
              fill="#EBE4F3"
            />
            <path
              d="M15.2 24.9C15 23.4 14.9 21.9 14.8 20.5C14.8 19.9 14.6 18.4 15.6 18.5C15.8 18.5 16 18.7 16 18.9C16.3 20.9 16.2 22.9 16 24.9C15.9 25.4 15.2 25.4 15.2 24.9Z"
              fill="#EBE4F3"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_light_sans"
              x="0"
              y="0"
              width="32"
              height="32"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_light_sans" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_light_sans" result="shape" />
            </filter>
          </defs>
        </svg>
      )
    }

    // LIGHT DESCRIPTION
    if (type === "light" && variant === "description") {
      return (
        <svg width={size} height={(size * 20) / 14} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.2 6C3.9 8 4.2 11.6 1.2 13.4C0.4 13.8 -0.2 12.7 0.5 12.2C1.7 11.4 2.6 9.6 1.6 8.3C1.3 7.9 0.9 7.5 0.4 7.2C-0.5 6.6 0.4 5.3 1.2 6Z"
            fill="#9A7AC1"
          />
          <path
            d="M4.3 3C5.8 3.7 7.4 4.8 8.1 6.5C8.5 7.5 8.8 8.5 8.8 9.7C8.9 12.5 7.1 15.6 4.4 16.5C4 16.6 3.6 16.4 3.5 16C3.4 15.7 3.5 15.4 3.7 15.2C4.2 14.7 4.6 14.3 5 13.9C6.6 12.4 7.7 10 7 7.9C6.8 7.4 6.4 6.9 6.1 6.5C5.6 5.5 4.7 4.6 3.7 3.7C3.3 3.4 3.8 2.7 4.3 3Z"
            fill="#9A7AC1"
          />
          <path
            d="M7.5 0C8.5 0.2 9.2 1 9.9 1.6C11.4 3 12.5 4.7 13.1 6.6C14 9.1 13.9 11.7 12.8 14C12.2 15.4 11 16.6 9.9 17.7C9.3 18.4 8.5 19 7.7 19.6C7.3 19.9 6.7 19.8 6.4 19.3C6 18.8 6.2 18.1 6.7 17.9C7.6 17.5 8.3 16.9 9 16.3C10.1 15.4 10.7 14.4 11.2 13.3C11.7 12.2 12.1 10.9 12.2 9.6C12.5 6.4 10.3 3.7 7.9 1.9C7.5 1.7 7.1 1.4 6.9 1C6.5 0.5 7 0 7.5 0Z"
            fill="#497676"
          />
        </svg>
      )
    }

    // SOUND CONTOUR
    if (type === "sound" && variant === "contour") {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_sound_contour)">
            <circle cx="16" cy="15.5" r="14.5" fill="#D77A4F" stroke="white" strokeWidth="1.5" />
            <path
              d="M10.8 12.3C13.5 14.3 13.9 17.9 10.9 19.7C10.1 20.2 9.5 19 10.2 18.5C11.4 17.7 12.3 15.9 11.3 14.6C11 14.2 10.6 13.8 10.1 13.5C9.2 12.9 10.1 11.6 10.8 12.3Z"
              fill="#F7E4DC"
            />
            <path
              d="M13.9 9.2C15.4 9.9 17 11 17.7 12.7C18.1 13.7 18.4 14.7 18.4 15.9C18.5 18.7 16.7 21.8 14 22.7C13.6 22.8 13.2 22.6 13.1 22.2C13 21.9 13.1 21.6 13.3 21.4C13.8 20.9 14.2 20.5 14.6 20.1C16.2 18.6 17.3 16.2 16.6 14.1C16.4 13.6 16 13.1 15.7 12.7C15.2 11.7 14.3 10.8 13.3 9.9C12.9 9.6 13.4 8.9 13.9 9.2Z"
              fill="#F7E4DC"
            />
            <path
              d="M17.1 6.2C18.1 6.4 18.8 7.2 19.5 7.8C21 9.2 22.1 10.9 22.7 12.8C23.6 15.3 23.5 17.9 22.4 20.2C21.8 21.6 20.6 22.8 19.5 23.9C18.9 24.6 18.1 25.2 17.3 25.8C16.9 26.1 16.3 26 16 25.5C15.6 25 15.8 24.3 16.3 24.1C17.2 23.7 17.9 23.1 18.6 22.5C19.7 21.6 20.3 20.6 20.8 19.5C21.3 18.4 21.7 17.1 21.8 15.8C22.1 12.6 19.9 9.9 17.5 8.1C17.1 7.9 16.7 7.6 16.5 7.2C16.1 6.7 16.6 6.2 17.1 6.2Z"
              fill="#F7E4DC"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_sound_contour"
              x="0"
              y="0"
              width="32"
              height="32"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_sound_contour" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_sound_contour" result="shape" />
            </filter>
          </defs>
        </svg>
      )
    }

    // SOUND SANS CONTOUR
    if (type === "sound" && variant === "sansContour") {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_sound_sans)">
            <circle cx="16" cy="15.5" r="15" fill="#D77A4F" />
            <path
              d="M10.8 12.3C13.5 14.3 13.9 17.9 10.9 19.7C10.1 20.2 9.5 19 10.2 18.5C11.4 17.7 12.3 15.9 11.3 14.6C11 14.2 10.6 13.8 10.1 13.5C9.2 12.9 10.1 11.6 10.8 12.3Z"
              fill="#F7E4DC"
            />
            <path
              d="M13.9 9.2C15.4 9.9 17 11 17.7 12.7C18.1 13.7 18.4 14.7 18.4 15.9C18.5 18.7 16.7 21.8 14 22.7C13.6 22.8 13.2 22.6 13.1 22.2C13 21.9 13.1 21.6 13.3 21.4C13.8 20.9 14.2 20.5 14.6 20.1C16.2 18.6 17.3 16.2 16.6 14.1C16.4 13.6 16 13.1 15.7 12.7C15.2 11.7 14.3 10.8 13.3 9.9C12.9 9.6 13.4 8.9 13.9 9.2Z"
              fill="#F7E4DC"
            />
            <path
              d="M17.1 6.2C18.1 6.4 18.8 7.2 19.5 7.8C21 9.2 22.1 10.9 22.7 12.8C23.6 15.3 23.5 17.9 22.4 20.2C21.8 21.6 20.6 22.8 19.5 23.9C18.9 24.6 18.1 25.2 17.3 25.8C16.9 26.1 16.3 26 16 25.5C15.6 25 15.8 24.3 16.3 24.1C17.2 23.7 17.9 23.1 18.6 22.5C19.7 21.6 20.3 20.6 20.8 19.5C21.3 18.4 21.7 17.1 21.8 15.8C22.1 12.6 19.9 9.9 17.5 8.1C17.1 7.9 16.7 7.6 16.5 7.2C16.1 6.7 16.6 6.2 17.1 6.2Z"
              fill="#F7E4DC"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_sound_sans"
              x="0"
              y="0"
              width="32"
              height="32"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_sound_sans" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_sound_sans" result="shape" />
            </filter>
          </defs>
        </svg>
      )
    }

    // SOUND DESCRIPTION
    if (type === "sound" && variant === "description") {
      return (
        <svg width={size} height={(size * 20) / 18} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4C7 2.9 7.9 2 9 2C10.1 2 11 2.9 11 4C11 5.1 10.1 6 9 6C7.9 6 7 5.1 7 4Z" fill="#497676" />
          <path
            d="M5 11C5 8.8 6.8 7 9 7C11.2 7 13 8.8 13 11V15C13 15.8 12.3 16.5 11.5 16.5H6.5C5.7 16.5 5 15.8 5 15V11Z"
            fill="#497676"
          />
          <path
            d="M1 4C1 3.2 1.7 2.5 2.5 2.5C3.3 2.5 4 3.2 4 4C4 4.8 3.3 5.5 2.5 5.5C1.7 5.5 1 4.8 1 4Z"
            fill="#497676"
          />
          <path
            d="M0 10C0 8.6 1.1 7.5 2.5 7.5C3.9 7.5 5 8.6 5 10V14C5 14.8 4.3 15.5 3.5 15.5H1.5C0.7 15.5 0 14.8 0 14V10Z"
            fill="#497676"
          />
          <path
            d="M14 4C14 3.2 14.7 2.5 15.5 2.5C16.3 2.5 17 3.2 17 4C17 4.8 16.3 5.5 15.5 5.5C14.7 5.5 14 4.8 14 4Z"
            fill="#497676"
          />
          <path
            d="M13 10C13 8.6 14.1 7.5 15.5 7.5C16.9 7.5 18 8.6 18 10V14C18 14.8 17.3 15.5 16.5 15.5H14.5C13.7 15.5 13 14.8 13 14V10Z"
            fill="#497676"
          />
        </svg>
      )
    }

    // CROWD CONTOUR
    if (type === "crowd" && variant === "contour") {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_crowd_contour)">
            <circle cx="15.5" cy="15" r="14.25" fill="#4FA1A1" stroke="white" strokeWidth="1.5" />
            <path
              d="M21.3 8.05C19.38 7.24 17.175 6.77 15.065 7.05C13.975 7.2 12.835 7.72 11.645 8.245C9.445 9.19 7.56 11.015 6.795 13.225C6.34 14.735 6.16 16.79 6.42 18.52C6.74 20.25 7.69 21.865 8.74 23.015C10.26 24.47 12.55 24.82 14.525 24.415C18.62 23.615 21.275 18.475 18.025 15.015C16.575 13.515 13.975 13.43 12.47 14.775C11.765 15.425 11.23 16.7 11.53 17.76C11.645 18.185 12.235 19.075 12.985 19.13C13.43 19.2 13.99 19.035 14.26 18.71C14.285 18.675 14.285 18.65 14.28 18.675C14.265 18.7 14.28 18.815 14.315 18.865L14.26 18.725C14.27 18.75 14.28 18.75 14.25 18.725C13.98 18.48 13.695 18.41 13.335 17.92C12.845 17.245 13.095 16.28 13.725 15.73C15.23 14.635 17.525 15.72 18.01 17.35C18.665 19.385 17.31 21.43 15.695 22.57C14.235 23.585 12.48 23.08 11.24 22.32C9.825 21.53 8.735 19.95 8.82 18.08C8.865 16.27 9.33 14.455 10.495 13.035C11.14 12.325 11.785 11.645 12.605 11.12C13.57 10.52 14.665 10.255 15.775 10.17C16.885 10.04 18.06 10.315 19.03 10.795C20.53 11.415 22.075 12.25 23.24 13.64C24.785 15.41 25.07 17.855 24.675 20.015C24.37 22.16 22.985 24.24 21.26 25.54C21.085 25.68 20.84 25.65 20.695 25.48C20.575 25.32 20.59 25.09 20.725 24.95C21.415 24.28 22.03 23.55 22.465 22.84C23.27 21.385 23.575 19.545 23.315 17.84C23.01 16.16 21.83 14.62 20.425 13.73C19.405 13.075 18.36 12.275 17.085 12.43C15.835 12.475 14.72 12.975 13.965 13.805C13.52 14.215 13.16 14.745 12.965 15.44C12.605 16.945 12.405 18.78 13.08 20.165C13.575 21.1 14.525 21.685 15.525 22.095C17.375 22.78 18.735 21.995 19.645 20.5C20.115 19.74 20.345 18.795 19.935 17.975C19.6 17.195 18.52 16.585 17.74 17.105L17.84 17.025C17.76 17.1 17.69 17.29 17.7 17.385C17.71 17.475 17.815 17.675 17.775 17.72C17.735 17.765 17.615 17.79 17.615 17.695C17.615 17.45 17.77 17.23 17.945 17.15C18.395 16.975 18.945 17.17 19.24 17.53C19.53 17.895 19.62 18.325 19.62 18.795C19.62 19.74 19.24 20.55 18.67 21.245C17.45 22.51 15.845 23.41 13.935 23.37C12.02 23.33 10.13 22.615 8.725 21.32C6.84 19.625 6.095 17.155 6 14.795C5.91 12.43 6.44 10.04 8.085 8.3"
              fill="#F7E4DC"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_crowd_contour"
              x="0"
              y="0"
              width="32"
              height="32"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_crowd_contour" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_crowd_contour" result="shape" />
            </filter>
          </defs>
        </svg>
      )
    }

    // CROWD SANS CONTOUR
    if (type === "crowd" && variant === "sansContour") {
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_crowd_sans)">
            <path
              d="M30.5 15C30.5 23.5604 23.5604 30.5 15 30.5C6.43959 30.5 -0.5 23.5604 -0.5 15C-0.5 6.43959 6.43959 -0.5 15 -0.5C23.5604 -0.5 30.5 6.43959 30.5 15Z"
              fill="#4FA1A1"
            />
            <path
              d="M21.65 8.33C19.73 7.52 17.525 7.05 15.415 7.33C13.975 7.48 12.835 8 11.995 8.525C9.795 9.47 7.91 11.295 7.145 13.505C6.69 15.015 6.51 17.07 6.77 18.8C7.09 20.53 8.04 22.145 9.09 23.295C10.61 24.75 12.9 25.1 14.875 24.695C18.97 23.895 21.625 18.755 18.375 15.295C16.925 13.795 13.975 13.43 12.47 14.775C11.765 15.425 11.23 16.7 11.53 17.76C11.645 18.185 12.235 19.075 12.985 19.13C13.43 19.2 13.99 19.035 14.26 18.71C14.285 18.675 14.285 18.65 14.28 18.675C14.265 18.7 14.28 18.815 14.315 18.865L14.26 18.725C14.27 18.75 14.28 18.75 14.25 18.725C13.98 18.48 13.695 18.41 13.335 17.92C12.845 17.245 13.095 16.28 13.725 15.73C15.23 14.635 17.525 15.72 18.01 17.35C18.665 19.385 17.31 21.43 15.695 22.57C14.235 23.585 12.48 23.08 11.24 22.32C9.825 21.53 8.735 19.95 8.82 18.08C8.865 16.27 9.33 14.455 10.495 13.035C11.14 12.325 11.785 11.645 12.605 11.12C13.57 10.52 14.665 10.255 15.775 10.17C16.885 10.04 18.06 10.315 19.03 10.795C20.53 11.415 22.075 12.25 23.24 13.64C24.785 15.41 25.07 18.135 25.025 20.015C24.72 22.16 22.985 24.24 21.26 25.54C21.085 25.68 20.84 25.65 20.695 25.48C20.575 25.32 20.59 25.09 20.725 24.95C21.415 24.28 22.03 23.55 22.465 22.84C23.27 21.385 23.575 19.545 23.315 17.84C23.01 16.16 21.83 14.62 20.425 13.73C19.405 13.075 18.36 12.275 17.085 12.43C15.835 12.475 14.72 12.975 13.965 13.805C13.52 14.215 13.16 14.745 12.965 15.44C12.605 16.945 12.405 18.78 13.08 20.165C13.575 21.1 14.525 21.685 15.525 22.095C17.375 22.78 18.735 21.995 19.645 20.5C20.115 19.74 20.345 18.795 19.935 17.975C19.6 17.195 18.52 16.585 17.74 17.105L17.84 17.025C17.76 17.1 17.69 17.29 17.7 17.385C17.71 17.475 17.815 17.675 17.775 17.72C17.735 17.765 17.615 17.79 17.615 17.695C17.615 17.45 17.77 17.23 17.945 17.15C18.395 16.975 18.945 17.17 19.24 17.53C19.53 17.895 19.62 18.325 19.62 18.795C19.62 19.74 19.24 20.55 18.67 21.245C17.45 22.51 15.845 23.41 13.935 23.37C12.02 23.33 10.13 22.615 8.725 21.32C6.84 19.625 6.095 17.155 6 14.795C5.91 12.43 6.44 10.04 8.085 8.3"
              fill="#F7E4DC"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_crowd_sans"
              x="0"
              y="0"
              width="32"
              height="32"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_crowd_sans" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_crowd_sans" result="shape" />
            </filter>
          </defs>
        </svg>
      )
    }

    // CROWD DESCRIPTION
    if (type === "crowd" && variant === "description") {
      return (
        <svg width={size} height={(size * 20) / 18} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4C7 2.9 7.9 2 9 2C10.1 2 11 2.9 11 4C11 5.1 10.1 6 9 6C7.9 6 7 5.1 7 4Z" fill="#497676" />
          <path
            d="M5 11C5 8.8 6.8 7 9 7C11.2 7 13 8.8 13 11V15C13 15.8 12.3 16.5 11.5 16.5H6.5C5.7 16.5 5 15.8 5 15V11Z"
            fill="#497676"
          />
          <path
            d="M1 4C1 3.2 1.7 2.5 2.5 2.5C3.3 2.5 4 3.2 4 4C4 4.8 3.3 5.5 2.5 5.5C1.7 5.5 1 4.8 1 4Z"
            fill="#497676"
          />
          <path
            d="M0 10C0 8.6 1.1 7.5 2.5 7.5C3.9 7.5 5 8.6 5 10V14C5 14.8 4.3 15.5 3.5 15.5H1.5C0.7 15.5 0 14.8 0 14V10Z"
            fill="#497676"
          />
          <path
            d="M14 4C14 3.2 14.7 2.5 15.5 2.5C16.3 2.5 17 3.2 17 4C17 4.8 16.3 5.5 15.5 5.5C14.7 5.5 14 4.8 14 4Z"
            fill="#497676"
          />
          <path
            d="M13 10C13 8.6 14.1 7.5 15.5 7.5C16.9 7.5 18 8.6 18 10V14C18 14.8 17.3 15.5 16.5 15.5H14.5C13.7 15.5 13 14.8 13 14V10Z"
            fill="#497676"
          />
        </svg>
      )
    }

    return null
  }

  return renderSVG()
}

export default SenseBadge
