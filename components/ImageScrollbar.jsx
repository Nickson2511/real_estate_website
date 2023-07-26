import { useState, useRef } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex, Button } from '@chakra-ui/react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

export default function ImageScrollbar({ data }) {
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScrollNext = () => {
    if (containerRef.current) {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        const maxIndex = data.length - 1;
        const newScrollLeft = nextIndex * containerRef.current.clientWidth;
        containerRef.current.scrollLeft = newScrollLeft;
        return Math.min(nextIndex, maxIndex);
      });
    }
  };

  const handleScrollPrev = () => {
    if (containerRef.current) {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        const newScrollLeft = newIndex * containerRef.current.clientWidth;
        containerRef.current.scrollLeft = newScrollLeft;
        return Math.max(newIndex, 0);
      });
    }
  };

  return (
    <Flex alignItems='center' p={4}>
      <Button
        leftIcon={<Icon as={FaArrowAltCircleLeft} boxSize='6' />}
        onClick={handleScrollPrev}
        isDisabled={currentImageIndex === 0}
      />
      <Box
        display='flex'
        flexDir='row'
        ref={containerRef}
        sx={{
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          scrollPadding: '1rem',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the default scrollbar
          },
        }}
      >
        {data.map((item, index) => (
          <Box
            key={item.id}
            width='910px'
            overflow='hidden'
            p='1'
            mx={2}
            scrollSnapAlign='center'
            display={index === currentImageIndex ? 'block' : 'none'}
          >
            <Image
              placeholder='blur'
              blurDataURL={item.url}
              src={item.url}
              width={1000}
              height={500}
              sizes='(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px'
            />
          </Box>
        ))}
      </Box>
      <Button
        rightIcon={<Icon as={FaArrowAltCircleRight} boxSize='6' />}
        onClick={handleScrollNext}
        isDisabled={currentImageIndex === data.length - 1}
      />
    </Flex>
  );
}
