import { useEffect, useRef } from 'react';
import { Movie } from '../../types/movie';

type VideoPlayerProps = {
  isPlaying: boolean;
  film: Movie;
}

function VideoPlayer({isPlaying, film}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.load();
  }, [isPlaying]);

  return (
    <video
      src={film.previewVideoLink}
      ref={videoRef}
      poster={film.previewImage}
      width="280"
      height="175"
      muted
    />
  );
}

export default VideoPlayer;
