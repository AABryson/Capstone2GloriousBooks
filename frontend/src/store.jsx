function SearchBookshelves () {

    const [shelves, setShelves] = useState([])
  
    const [books, setBooks] = useState('')
    // const [input, setInput] = useState('')

    const apiKey = 'AIzaSyBZRAIzaSyBJo7SCNGuT27ZbgzdgO0R9t-UT4nrERsA'
    const authToken = 'ya29.a0AXooCguzLMDot5fEnBA314iXMs2vPeG-LCaPet__bjy36lSNwSa7hqEzx3eSk3LhC8MxXmttFzxZ_I3ZqfKGriCWhSyLBDCxKA7qJsfy5OwoOUIg-IPc1u9Ecgswm-zQ_i5yHkVGaH2YTg_CEIuIY05spvxIVkDIktgbaCgYKARESARESFQHGX2MieE2hVv7SHDfeG7Gd5ik3nQ0171'
    



    async function getShelves() {
        let result = await axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${apiKey}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        console.log('bookshelves result', result.items)
        setShelves(result.items)
        setInput('')
    }

    useEffect(() => {
        getShelves()
    }, [])
    useEffect(() => {
        shelves.forEach((shelf) => {
            let number = shelf.id
            console.log('shelf id', number)
            async function getBooks(){
                let result = await axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${number}/volumes?key=${apiKey}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                })
                console.log('items returned', books)
                //[]
                setBooks(prevState) ([
                    ...prevState,
//?
                    ...result.items
                ])
                }
            getBooks()
        })
        
        }, [shelves]);
    

    



    return (
       
        <div className='container-fluid'>
            <div className='row'>
                <a href='./favorites'>Favorites</a>
            </div>
           
        </div>
    )
}
