 import React ,{useState ,useEffect} from 'react'
 import{Loader , Card , FormField} from '../components';
 const RenderCards=({ data,title }) =>{
    if(data ?.length >0){ 
        return data.map((post) => <Card key= {post._id} {...post} />)
    }
    return(
        <h2 classname="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
 }
 const Home = () => {
    const [loading, setsoading] = useState();
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedResults,setSearchedResults] = useState(null);
    const [searchTimeout, setsearchTimeout] = useState(null);
    
    useEffect(() =>{
        const fetchPosts= async () =>{
            setsoading(true);

            try {
                const response= await fetch('http://localhost:8000/api/v1/post',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',   
                    },
                })
                if(response.ok){
                    const result=await response.json();
                    setAllPosts(result.data.reverse());
                }
                
            } catch (error) {
                alert(error)
            }finally{
                setsoading(false);
            }
        }
        fetchPosts();
    },[]);
    const handleSearchChange=(e) => {
        setSearchText(e.target.value);
       setsearchTimeout(
        setTimeout(() => {
          const searchResults=allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
          setSearchedResults(searchResults);
        },500)
    );
    }

   return (
    <section className="max-w-7xl mx-auto">
     <div>
     <h1 className="font-extrabold text-[#222328] text-[28px]">The Community ShowCase</h1>
     <p className="mt-2 text-[#666e75] text-[15px] max-w-[700px]">Browse through a collection of imaginative and visually stunning images by DALL-E AI.</p>

     </div>
     <div class="mt-16">
        <FormField
         labelName="Search Posts"
         type="text"
         name="text"
         placeholder="Search Posts"
         value={searchText}
         handleChange={handleSearchChange}
        />
    </div>
    <div className="mt-10">
        {loading ? (
            <div className="flex justify-center item-center">
            <Loader />
            </div>
        ):(
            <>
            {searchText && (
               <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for 
                <span className="text-[#222328]">{searchText}</span>
                </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 text-blue-700 font-bold text-[20px]">
            {searchText ?(
                <RenderCards
                data={searchedResults}
                title="No search results found"
                />
            ):(
                <RenderCards 
                data={allPosts}
                title="No posts found"
                />
            )}
            </div>
            </>
        )}
        </div>
    </section>
   )  
 }

 export default Home




