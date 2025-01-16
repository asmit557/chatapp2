import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import apiClient from '@/lib/api-client';
import { animationDefaultOptions } from '@/lib/utils';
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTES, SEARCH_CONTACTS_ROUTES } from '@/utils/contants';
import React ,{useEffect}from 'react'
import { HOST } from '@/utils/contants';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Lottie from 'react-lottie';
import { getColor } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import MultipleSelector from '@/components/ui/multiselect';
const CreateChannel = () => {
  const {setSelectedChatType,setSelectedChatData,addChannel} = useAppStore();
  const [allContacts, setAllContacts] = useState([]);
  const [channelName,setChannelName] = useState("");
  const [newChannel,setNewChannel] = useState(false);
  const [searchedContacts,setSearchedContacts] = useState([]);
  const [selectedContacts,setSelectedContacts]= useState([]);
  useEffect(()=>{
       const getData = async()=>{
          const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES,{withCredentials:true})
          setAllContacts(response.data.contacts)
       }

       getData();
  },[])
  

  const createChannel = async()=>{
     try{
      if(channelName.length>0 && selectedContacts.length>0){
         const response = await apiClient.post(CREATE_CHANNEL_ROUTE,{name:channelName,members:selectedContacts.map((contact)=>contact.value)},{withCredentials:true});
         if(response.status==201){
            setChannelName("")
            setSelectedContacts([])
            setNewChannel(false);
            addChannel(response.data.channel);
         }
      }
     }catch(error){
       console.log({error});
     }
  }
  return (
  <>
    <TooltipProvider>
      <Tooltip>
           <TooltipTrigger>
              <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={()=>setNewChannel(true)}/>
           </TooltipTrigger>
           <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">Create New Channel</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={newChannel} onOpenChange={setNewChannel}>
<DialogContent classname="bg-black border-none text-white w-[400px] h-[400px] flex flex-col">
  <DialogHeader>
    <DialogTitle>Please fill up the details for new channel</DialogTitle>
  </DialogHeader>
  <div>
      <Input placeholder="Channel Name"
       className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
        onChange={(e)=>setChannelName(e.target.value)}
        value={channelName}
      />
  </div>
  <div>
    <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
      defaultOptions={allContacts}
      placeholder="Search Contacts"
      value={selectedContacts}
      onChange={setSelectedContacts}
      emptyIndicator={
        <p className='text-center text-lg leading-10 text-gray-600'>
          No results found.
        </p>
      }
    />
  </div>
  <div>
  <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
  onClick={createChannel}>
  Create Channel</Button>
  </div>
</DialogContent>
</Dialog>

  </>
)
}

export default CreateChannel;