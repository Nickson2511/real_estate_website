import axios from 'axios';

export const baseUrl ='https://bayut.p.rapidapi.com'


 export const fetchApi =async(url) =>{
    const {data}= await axios.get((url),{
        headers: {
          'X-Rapidapi-Host': 'bayut.p.rapidapi.com',
          'X-Rapidapi-Key': '1cd03de230msh60c3083aa6cd9e5p12545djsn7ad308e32a66',
          },
            
            


    });
    return data;
 }

 