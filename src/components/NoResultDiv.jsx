const NoResultsDiv =()=>{
    return <div className="no-results">
        <img src="icons/no-result.svg" alt="No Results Found" className="icon"></img>
        <h3 className="title">Something went wrong.</h3>
        <p>We are unable to process your request. Ensure you have entered a valid city or please try again later.</p>
    </div>
}
export default NoResultsDiv;