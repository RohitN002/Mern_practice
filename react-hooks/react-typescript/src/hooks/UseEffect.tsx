import { useEffect, useState } from 'react'
interface Data{
id:number,
name:String
}
const UseEffect = () => {
    const [data,setData]=useState<Data[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    const [error,setError]=useState<string|null>(null)
    
    useEffect(()=>{
const fetchData=async()=>{
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: Data[] = await response.json();
        setData(result);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();


    },[])
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
  return (
    <div><h1>UseEffect</h1>
    <div>
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  )
}

export default UseEffect