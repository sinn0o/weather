import type { ReactNode } from 'react';
import type { WeatherCategory } from '../../types/weather';
import { WEATHER_CATEGORY_LABELS_KO } from '../../constants';

interface WeatherIconProps {
  category: WeatherCategory;
  className?: string;
}

/** 카테고리별 flat-style SVG 날씨 아이콘. currentColor로 색을 상속받는다. */
export function WeatherIcon({ category, className }: WeatherIconProps) {
  const label = WEATHER_CATEGORY_LABELS_KO[category];

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={label}
      fill="none"
    >
      {ICON_CONTENT[category]}
    </svg>
  );
}

const ICON_CONTENT: Record<WeatherCategory, ReactNode> = {
  clear: (
    <g>
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="1.5" x2="12" y2="3.5" />
        <line x1="12" y1="20.5" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="3.5" y2="12" />
        <line x1="20.5" y1="12" x2="22.5" y2="12" />
        <line x1="4.5" y1="4.5" x2="5.9" y2="5.9" />
        <line x1="18.1" y1="18.1" x2="19.5" y2="19.5" />
        <line x1="4.5" y1="19.5" x2="5.9" y2="18.1" />
        <line x1="18.1" y1="5.9" x2="19.5" y2="4.5" />
      </g>
    </g>
  ),
  cloudy: (
    <g>
      <circle cx="8.5" cy="9.5" r="4" fill="currentColor" opacity="0.55" />
      <path
        d="M6.5 18a4 4 0 0 1 .3-8 5 5 0 0 1 9.6 1.6A3.5 3.5 0 0 1 16 18H6.5z"
        fill="currentColor"
      />
    </g>
  ),
  overcast: (
    <path
      d="M6 17.5a4 4 0 0 1-.4-7.9 5.5 5.5 0 0 1 10.4-2 4 4 0 0 1 1.6 7.8 3 3 0 0 1-.6.1H6z"
      fill="currentColor"
    />
  ),
  fog: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4.5 9.5a4 4 0 0 1 7.5-1.8 4.3 4.3 0 0 1 6 3.8" />
      <line x1="3" y1="14" x2="21" y2="14" />
      <line x1="5.5" y1="18" x2="18.5" y2="18" />
    </g>
  ),
  rain: (
    <g>
      <path
        d="M6 14.5a4 4 0 0 1-.4-7.9A5.5 5.5 0 0 1 16 5a4 4 0 0 1 1.6 7.8 3 3 0 0 1-.6.1H6z"
        fill="currentColor"
      />
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <line x1="8" y1="17.5" x2="7" y2="21.5" />
        <line x1="12" y1="17.5" x2="11" y2="21.5" />
        <line x1="16" y1="17.5" x2="15" y2="21.5" />
      </g>
    </g>
  ),
  snow: (
    <g>
      <path
        d="M6 13.5a4 4 0 0 1-.4-7.9A5.5 5.5 0 0 1 16 4a4 4 0 0 1 1.6 7.8 3 3 0 0 1-.6.1H6z"
        fill="currentColor"
        opacity="0.9"
      />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="8" y1="17" x2="8" y2="21.5" />
        <line x1="6" y1="17.7" x2="10" y2="20.8" />
        <line x1="10" y1="17.7" x2="6" y2="20.8" />
        <line x1="15.5" y1="17" x2="15.5" y2="21.5" />
        <line x1="13.5" y1="17.7" x2="17.5" y2="20.8" />
        <line x1="17.5" y1="17.7" x2="13.5" y2="20.8" />
      </g>
    </g>
  ),
  thunderstorm: (
    <g>
      <path
        d="M6 12.5a4 4 0 0 1-.4-7.9A5.5 5.5 0 0 1 16 2.9a4 4 0 0 1 1.6 7.8 3 3 0 0 1-.6.1H6z"
        fill="currentColor"
      />
      <path d="M12.5 13l-3.2 5.2h2.6l-1.5 4.3 4.9-6.4h-2.8l1.3-3.1z" fill="currentColor" />
    </g>
  ),
};
