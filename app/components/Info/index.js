"use client"
import { useEffect, useState } from "react";

export default function Info(){
  const regex = /(?<=\/id\/)\d+/
  const [formData, setFormData] = useState(null)
  const [fetchData, setFetchData] = useState(null);

    function get_form_data(){
      console.log("SE LLAMA")
      const formulario = document.getElementById('profile_form')

      if(formulario){
        formulario.querySelectorAll('input').forEach(input => {
          const matches = input.value.match(regex)
          if (matches){
            setFormData(matches[0])
            return
          }
        });
      } 
    }


   

    // useEffect(() => {
    //   console.log("Fetch data: ", fetchData)
    // }, [fetchData])
    
    useEffect(() => { 
      console.log("Form Data:", formData)

      if(formData != null){

        const fetchData2 = async () => {


            const response = await fetch(`http://localhost:3001/get_steam_id?id=${formData}`);
            const newData = await response.json();
            
            setFetchData(newData)
          }

      
        fetchData2();
      }
      
      
    }, [formData])


    
    return(
      <>
        <section className="flex flex-col h-1/2 sm:h-full justify-center items-center w-full ">
 
            <div className="flex flex-col sm:items-center sm:justify-center w-full h-full">
              <div className="flex flex-col items-start p-4 gap-4 sm:p-6 sm:gap-6">
                <p className="text-sm text-gray-400 ">1. Go to your profile and use right click</p>
                <p className="text-sm text-gray-400 ">2. Copy and paste the link in the SteamID search bar</p>
                <p className="text-sm text-gray-400 ">3. Send your profile and wait</p>
              </div>
              <form onSubmit={get_form_data} id="profile_form" name="profile_form" className="flex w-full justify-center items-center p-6">
                <input type="url" className="w-full sm:w-3/4 px-2 py-1 xl:w-1/2 text-sm text-center rounded-md" placeholder="www.steam.com/profile"	 id="profile_input" name="profile_input" required minLength="4" size="10" />
              </form>
            </div>
      </section>
      <section className="flex h-full w-full p-1 sm:h-3/4 ">
          {!fetchData ? ( 
            <div className="flex w-full h-full border-double border-4 border-gray-600 backdrop-blur-xl">
                <div className="flex w-full items-center justify-center">
                  <p className="text-white text-opacity-35">Awaiting profile...</p>
                </div>
            </div>
          ) : (
            <div className="flex w-full h-full border-double border-4  border-gray-600 backdrop-blur-xl">
              <div className="flex w-full items-center justify-center">
                <p className="text-white text-opacity-35">STEAMID: </p>
              </div>
            </div>
          )}

      </section>
      </>
    )
}