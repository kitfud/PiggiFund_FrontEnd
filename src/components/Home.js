import React from 'react'
import {  Box, Typography, Card, CardMedia, CardHeader, CardContent, ListItemText,List,ListItem, ListItemIcon} from "@mui/material"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import HandshakeIcon from '@mui/icons-material/Handshake';
import imageContracts from '../img/ContractsPic.png'
import imageMaker from '../img/MakerPic.png'
import imageUI from '../img/UIPic.png'

const Home = () => {
  return (
    <>
      <Card sx={{marginTop:3}}>
        <Box>
        <Typography sx={{fontSize:20}}>Welcome To the PiggiFund Protocol!</Typography>
        </Box>

        <Box sx={{p:0.5,marginTop:1, display:"block"}}>
        <Card variant="elevation">
        <CardHeader title="ABOUT"/> 
  <CardContent>
<Typography>
  The PiggiFund protocol provides a cyrptofundraising platform to the masses. Use the PiggiFund Maker to mint a custom fundraising contract
  and share out the address along with the PiggiFund UI to begin your campaign!
</Typography>
</CardContent>
          </Card>
          </Box>


<Box sx={{p:0.5,marginTop:1, display:"block"}}>
<Card variant="elevation">
<CardHeader title="THE PROTOCOL"/> 
<CardContent>
<List>
    <ListItem>
      <ListItemIcon>
    <EmojiEventsIcon/>
      </ListItemIcon>
      <ListItemText>
  The fundraiser sets a contract goal. Funds can be donated towards the goal until it is met or the refund period arrives. If the funding goal is met 
  no more contributions can be made to the campaign and the fundraiser is allowed to withdraw all funds.
      </ListItemText>   
    </ListItem>


    <ListItem>
      <ListItemIcon>
<KeyboardReturnIcon/>
      </ListItemIcon>
      <ListItemText>
A refund period is set by the fundraiser which signals the end of a fundraising campaign without the fundraising goal havig been met. 
Doners have the option of intializing a refund on their contribution via the PiggiFund UI. The fundraier is not able to withdraw donations yet.
      </ListItemText>   
    </ListItem>


    <ListItem>
      <ListItemIcon>
<HandshakeIcon/>
      </ListItemIcon>
      <ListItemText>
A claim period is set by the fundraiser signaling the end of when doners can get a refund. During this period, even though the fundraising goal
has not been met, the fundraiser is allowed to withdraw all donations. 
      </ListItemText>   
    </ListItem>

  </List>
</CardContent>
          </Card>
</Box>


<Card variant="outlined">
<CardHeader title="THE TOOLS"/>
<Box sx={{p:0.5,display:'inline-block', width:1/3}}>
  <Card variant="outlined">
      <CardHeader title="PiggiFund Maker"/>
      <CardContent>
     
        <Typography>
        Use the PiggiFund Maker to deploy your own Solidity smart-contract. Set your funding goal, campaign description, refund period and claim period and house this 
      information transparently, on chain. 
        </Typography>
        <CardMedia  sx={{height:140 }}image={imageMaker}/>
       
      </CardContent>
    </Card>
  </Box>

  <Box sx={{p:0.5,display:'inline-block', width:1/3}}>
  <Card variant="outlined">
      <CardHeader title="PiggiFund UI"/>
      <CardContent>
       <Typography>
    Visualize and make deposits into a PiggiFund contract with the PiggiFund UI. The innovative system detects the user's MetaMask address
    and will conditionaly render buttons avaiable for refunding or withdrawing depending on the timeframe.
       </Typography>
       <CardMedia sx={{height:140 }}image={imageUI}/>
      </CardContent>
    </Card>
</Box>

<Box sx={{p:0.5,display:'inline-block', width:1/3}}>
<Card variant="outlined">
      <CardHeader title="PiggiFund Contracts"/>
      <CardContent>
        <Typography>
          Search through PiggiFund contracts and grab an interesting contract address to search for 
          using the PiggiFund UI
        </Typography>
        <CardMedia sx={{height:140 }}image={imageContracts}/>
      </CardContent>
    </Card>
</Box>


</Card>

  




      </Card>
  
    
    
    </>
  )
}

export default Home