import React from 'react'
import {useContext} from 'react'

import { Appcontext } from '../Context/Auth'
import { useState} from "react"
import { Box,Input,Center,InputGroup,InputRightElement,
    Text,Badge,Image,SimpleGrid,Button} from "@chakra-ui/react"
import { SearchIcon,StarIcon } from "@chakra-ui/icons"
import { useToast } from '@chakra-ui/react'
import Loading from "../Loading"
import Navbar from "../components/Navbar"
import Mainpage from '../components/Mainpage'



function HotelPage(){

const[loading,setLoding]=useState(false)
const[city,setCity]=useState('')
const[data,setData]=useState(null)
const toast = useToast()
const[checkin,setCheckin]=useState('')
const[chekout,setChekout]=useState('')
const{addData,dat}=useContext(Appcontext)

const[navbar,setNavbar]=useState(true)









function twoPro(item){
 
   addData(item)
        
   toast({
    title:'Product Added To Cart Succesfully',
    status: 'success',
    position:'top',
    isClosable: true,
  })



    
    }
    







function handleClick(){

setNavbar(false)
setLoding(true)




    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72061a6616mshdd6deb7d3a15b64p124cc2jsn39dc6d97b4ea',
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
        }
    };
    
    fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${city}&search_type=CITY`, options)
    .then(response => response.json())
	.then(response => getData (response[0].cityID)      )
	.catch(err => console.error(err));



    

}

console.log("Cart data ",dat)


function getData(cityid){

    const option = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72061a6616mshdd6deb7d3a15b64p124cc2jsn39dc6d97b4ea',
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
        }
    };
    
    fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?sort_order=HDR&location_id=${cityid}&date_checkout=${chekout}&date_checkin=${checkin}&star_rating_ids=3.0%2C3.5%2C4.0%2C4.5%2C5.0&rooms_number=1&amenities_ids=FINTRNT%2CFBRKFST`, option)
        .then(response => response.json())
        .then(response => setData(response.hotels)).then(setLoding(false))
        .catch(err => console.error(err));



}


console.log(data)













if(loading){
 return  <Loading lod={loading}/>
}





return(
<Box  background={"linear-gradient(to right, #33ccff 0%, #ff99cc 100%)"} w='9xl' h='9xl'>
<Navbar/>

<Box position={'relative'}>

<Box position={'absolute'} right='20'  bottom='20' mr='30' mb='200' >
<Center>    </Center>
  
   
   
    
    <InputGroup  ml='100' mt='40'>
    <Text mt='2' mr='3' fontWeight={'black'} >Date Checkin</Text>
    <Input type={'text'} color='black'  placeholder='YY-MM-DD' w='50' mr='3'  focusBorderColor='teal' borderColor='crimson' onChange={(e)=>setCheckin(e.target.value)} />
    <Text mt='2' mr='3'  fontWeight={'black'}>Date Checkout</Text>
    <Input type={'text'} placeholder='YY-MM-DD' w='50' mr='3'  focusBorderColor='teal' borderColor='crimson' onChange={(e)=>setChekout(e.target.value)}/>
    <InputRightElement><SearchIcon mr='200' w='6' h='8' _hover={{cursor:'pointer'}} onClick={handleClick}/></InputRightElement>
    <Input type='text' placeholder='City Name'  w='xl' h='10' focusBorderColor='teal' borderColor='crimson' color='pink.200'  onChange={(e)=>setCity(e.target.value)}/>
 </InputGroup>
   
   
</Box>





<Image borderRadius={'30'} ml='40' mt='3' h={'xl'} w='8xl' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/59/ac/b6/lavasa-international.jpg?w=1600&h=900&s=1'/>

    <Text    position={'absolute'}  fontSize="60"  right='20'  bottom='20' color={'white'} mr='300' mb={'300'}  >Latest reviews. Lowest prices.</Text>
    </Box>


<Box mt='10'>

<SimpleGrid columns={4} spacing={3}>

{
    (data!=null?data.map((item,index)=>{
      if(index!=0 && index<=30){
        
       return        <Box  id={item.hotelId}   maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={item.media.url} alt={item.name} w='lg'  h='80' />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            3 beds &&  2 baths
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {item.name}
        </Box>

        <Box>
          {Math.ceil(Number(item.ratesSummary.minPrice)*83)}
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < item.starRating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {item.totalReviewCount} reviews
            <Button
            ml='4'
   
    loadingText='Loading'
    colorScheme='green'
    variant='solid'
    spinnerPlacement='end'
    _hover={{backgroundColor:'red.400'}}
    onClick={()=>twoPro(item)}


  >
    Book Now
  </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  
      }
    }):console.log('error'))
}


</SimpleGrid>






</Box>


<Mainpage/>




    









































       
 </Box>


)


}


export default HotelPage;

    




  
   
