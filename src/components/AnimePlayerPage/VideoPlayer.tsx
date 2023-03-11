import { useState, useEffect } from 'react';
import { Skeleton, Stack, Text } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

interface videoPlayerProps {
    refresh: boolean;
    setHasError : React.Dispatch<React.SetStateAction<boolean>>
}

const VideoPlayer = ({ refresh, setHasError }: videoPlayerProps) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const { episodeId } = useParams<{ episodeId: string }>();


    useEffect(() => {
        async function fetchVideoData() {
            try {
                setIsLoading(true);
                const url = `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`;
                const response = await fetch(url);
                const data = await response.json();
                setVideoUrl(data.sources[0].url);
                setIsLoading(false);
                setIsReady(true);
            } catch (error) {
                throw error;
                console.error('error');
            }
        }

        fetchVideoData();
    }, [episodeId, refresh]);

    if (isLoading) {
        return <Skeleton height={{ base: '180px', md: '440px' }} />;
    }

    if (!isReady) {
        return null;
    }

    return (

        <ReactPlayer
            url={`https://cors.haikei.xyz/${videoUrl}`}
            controls
            width="100%"
            height="auto"
            onError={(e) => setHasError(true)}
        />
    );

};

export default VideoPlayer;
