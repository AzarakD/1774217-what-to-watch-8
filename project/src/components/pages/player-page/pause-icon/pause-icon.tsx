import { memo } from 'react';

function PauseIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 14 21"
      width="14"
      height="21"
      data-testid="pause"
    >
      <use xlinkHref="#pause"></use>
    </svg>
  );
}

export default memo(PauseIcon);
