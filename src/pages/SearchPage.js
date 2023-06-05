import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { Container, Typography, TextField, Grid, Select, MenuItem, Button, InputLabel, FormControl, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import GymCard from '../components/GymCard'
import axios from 'axios'
import Footer from '../components/Footer'

function SearchPage() {
  const { id } = useParams()
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState();
  const [rooms, setRooms] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/rooms?name=${name}&address=${address}&service=${service}&priceMin=${price ? price.priceMin : null}&priceMax=${price ? price.priceMax : null}`);
      console.log(response.data.data.rooms)
      await setRooms(response.data.data.rooms)
      console.log('rooms:', rooms)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSearch = () => {
    fetchData()
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleChangeService = (event) => {
    setService(event.target.value)
  }

  const handleChangePrice = (event) => {
    setPrice(event.target.value)
  }

  return (
    <>
      <Header />
      <Container style={{ paddingTop: '80px' }} fixed>
        <Typography variant="h5">検索</Typography>
        <TextField placeholder="Search" rows={1} fullWidth onChange={handleChangeName} />
        <Grid container spacing={3} marginTop={'20px'}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Address</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={address}
                label="Address"
                onChange={handleChangeAddress}
                style={{ minWidth: '200px' }}
              >
                <MenuItem value={'HoChiMinh'}>Ho Chi Minh</MenuItem>
                <MenuItem value={'Hanoi'}>Ha Noi</MenuItem>
                <MenuItem value={'Danang'}>Da Nang</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={price}
                label="Price"
                onChange={handleChangePrice}
                style={{ minWidth: '200px' }}
                renderValue={(price) => (`${price.priceMin} ${price.priceMax ? '- ' + price.priceMax : '以上'}`)}
              >
                <MenuItem value={{ priceMin: 100, priceMax: 300 }} >100-300</MenuItem>
                <MenuItem value={{ priceMin: 300, priceMax: 500 }} >300-500</MenuItem>
                <MenuItem value={{ priceMin: 500, priceMax: null }} >500-1000</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Service</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={service}
                label="Service"
                onChange={handleChangeService}
                style={{ minWidth: '200px' }}
              >
                <MenuItem value={'pool'}>Pool</MenuItem>
                <MenuItem value={'sauna'}>Sauna</MenuItem>
                <MenuItem value={'parking'}>Parking</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" style={{ height: '100%', minWidth: '160px', float: 'right' }} onClick={handleSearch}>Search</Button>
          </Grid>
          {rooms.length === 0 ?
            <Grid item xs={4}>
              <Typography>No room found</Typography>
            </Grid>
            :
            rooms.map((item) => (
              <Grid item xs={4}>
                <GymCard room={item} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default SearchPage
