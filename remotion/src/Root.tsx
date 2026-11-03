import { Composition } from 'remotion';
import { SneezeReel, REEL_DURATION } from './SneezeReel';

export const RemotionRoot: React.FC = () => {
    return (
        <Composition
            id="SneezeReel"
            component={SneezeReel}
            durationInFrames={REEL_DURATION}
            fps={30}
            width={1600}
            height={1000}
        />
    );
};
