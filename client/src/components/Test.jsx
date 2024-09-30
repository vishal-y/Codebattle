import { useSearchParams } from 'react-router-dom';

const Test = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchParams({ query: value });
    };

    const updateParams = (newParams) => {
        const params = Object.fromEntries(searchParams.entries());
        setSearchParams({ ...params, ...newParams });
        console.log(searchParams)
    };

    return (
        <div className='h-screen w-screen flex flex-col text-white justify-center items-center'>
            <input
                type="text"
                value={searchParams.get('query') || ''}
                onChange={handleChange}
            />
            <p>Current query: {searchParams.get('query')}</p>

            <input
                type="text"
                value={searchParams.get('query') || ''}
                onChange={(e) => updateParams({ query: e.target.value })}
            />
            <input
                type="number"
                value={searchParams.get('number') || ''}
                onChange={(e) => updateParams({ number: e.target.value })}
            />
            <p>Current query: {searchParams.get('query')}</p>
            <p>Current page: {searchParams.get('page')}</p>
        </div>
    );
};

export default Test;
