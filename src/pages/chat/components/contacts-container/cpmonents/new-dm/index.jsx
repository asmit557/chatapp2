import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import apiClient from '@/lib/api-client';
import { animationDefaultOptions } from '@/lib/utils';
import { SEARCH_CONTACTS_ROUTES } from '@/utils/contants';
import React from 'react'
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Lottie from 'react-lottie';
import { getColor } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HOST } from '@/utils/contants';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAppStore } from '@/store';
const NewDM = () => {
    const {setSelectedChatType,setSelectedChatData} = useAppStore();
    const searchContacts = async(searchterm)=>{
         console.log(searchterm);
           try{
               if(searchterm.length>0){
                  const response = await apiClient.post(SEARCH_CONTACTS_ROUTES,{searchterm},{withCredentials:true});
                  if(response.status===200 && response.data.contacts){
                     setSearchedContacts(response.data.contacts);
                  }
               }else{
                  setSearchedContacts([]);
               }
           }catch(error){
              console.log(error);
           }
    }
    const [openNewContact,setOpenNewContact] = useState(false);
    const [searchedContacts,setSearchedContacts] = useState([]);
    const selectedNewContact = (contact)=>{
          setOpenNewContact(false);
          setSelectedChatType("contact");
          setSelectedChatData(contact)
          setSearchedContacts([]);

    }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
             <TooltipTrigger>
                <FaPlus classname="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transitiona-all duration-300"
                onClick={()=>setOpenNewContact(true)}/>
             </TooltipTrigger>
             <TooltipContent classname="bg-[#1c1b1e] border-none mb-2 p-3 text-white">Select New Contact</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
  <DialogContent classname="bg-black border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle>Please select a contact</DialogTitle>
    </DialogHeader>
    <div>
        <Input placeholder="Search Contacts"
         className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
          onChange={(e)=>searchContacts(e.target.value)}
        />
    </div>
     { searchedContacts.length>0 && <ScrollArea className="h-[250px]">
        <div className='flex flex-col gap-5'>
             {
                searchedContacts.map((contact)=>(
                    <div key={contact._id} onClick={()=>selectedNewContact(contact)}  className='flex gap-3 items-center cursor-pointer'>
                          <div className='w-12 h-12 relative'>
                                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                  {contact.image ? (
                                                    <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className="object-cover w-full h-full bg-black" />
                                                  ) : (
                                                    <div
                                                      className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center ${getColor(
                                                        contact.color
                                                      )}`}
                                                    >
                                                      {contact.firstName || contact?.email?.split("")?.shift() || ""}
                                                    </div>
                                                  )}
                                                </Avatar>
                                  </div>
                                  <div className='flex flex-col'>
                                     <span>{
                                        contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}`: contact.email
                                     }</span>
                                     <span className='text-xs'>{contact.email}</span>
                                  </div>
                         </div>
                ))
             }
        </div>
     </ScrollArea> }
    {
        searchedContacts.length<=0 && <div className='flex-1 md:flex flex-col mt-5 md:mt-0 justify-center items-center duration-1000 transition-all'>
      <Lottie isClickToPauseDisabled={true}
        height={100}
        width={100}
        options={animationDefaultOptions}
      />
      <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
        <h3 className='poppins-medium text-black'>
           Hi<span className='text-purple-500'>!</span> Search new<span className='text-purple-500'> Contact.</span>
        </h3>
      </div>
    </div>
    }
  </DialogContent>
</Dialog>

    </>
  )
}

export default NewDM