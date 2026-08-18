import type { ComponentType } from 'react';
import type { SilhouetteProps } from './types';
import { EiffelTower } from './EiffelTower';
import { TokyoTower } from './TokyoTower';
import { StatueOfLiberty } from './StatueOfLiberty';
import { SydneyOperaHouse } from './SydneyOperaHouse';
import { PyramidsOfGiza } from './PyramidsOfGiza';
import { ChristTheRedeemer } from './ChristTheRedeemer';
import { BigBen } from './BigBen';
import { TajMahal } from './TajMahal';

/**
 * illustrationSet 키 → 실루엣 컴포넌트 매핑.
 * 여기 등록되지 않은 랜드마크는 SilhouetteLayer가 자동으로 GenericSilhouette를 사용한다.
 * 새 도시를 추가하려면: 이 폴더에 SilhouetteProps를 받는 컴포넌트를 만들고 아래에 한 줄 추가하면 된다.
 */
export const SILHOUETTE_REGISTRY: Record<string, ComponentType<SilhouetteProps>> = {
  'paris-eiffel': EiffelTower,
  'tokyo-tower': TokyoTower,
  'newyork-liberty': StatueOfLiberty,
  'sydney-opera-house': SydneyOperaHouse,
  'cairo-pyramids': PyramidsOfGiza,
  'rio-christ': ChristTheRedeemer,
  'london-big-ben': BigBen,
  'agra-taj-mahal': TajMahal,
};
