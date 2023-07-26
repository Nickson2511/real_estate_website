'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property'; 

export const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1} <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const Home = ({ propertiesForSale, propertiesForRent }) => {
 
  return (
    <Box>
    <Flex justifyContent="center" alignItems="center" p="5">
    <Text fontSize="4xl" fontWeight="bold" color="teal.500">
      Let's Build Something Cool with nick
    </Text>
  </Flex>
      <Banner
        purpose="Rent A Home"
        title1="Rent Home with"
        title2="Nick"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {/*Fetch the properties and map over them */}
        {propertiesForRent.map((property) => 
          <Property property={property} key={property.id} />
        )}
      </Flex>
      <Banner
        purpose="Buy A Home"
        title1="Find, Buy and own your Home with"
        title2="Nick"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore with Nick"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
      {/*Fetch the properties and map over them */}
      {propertiesForSale.map((property) => 
        <Property property={property} key={property.id} />
      )}
      </Flex>
    </Box>
  );
};

//code to fetch data i.e api call to fetch data
export async function getStaticProps() {
  const propertiesForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertiesForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertiesForSale?.hits,
      propertiesForRent: propertiesForRent?.hits,
    },
  };
}

export default Home;
