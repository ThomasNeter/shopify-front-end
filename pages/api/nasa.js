export async function getNasa() {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=YkmTmSEo7egiCG0c0fGGRNil8uBZl2CO7aIfkYdM')
    const json = await res.json()
  
    return json
}