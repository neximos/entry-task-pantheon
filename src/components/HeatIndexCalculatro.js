function HeatIndexCalculator() {
    
    return (
        <div className="heat-index">
            <form id="form-heat-index">
                <h4>Heat Index Calculator</h4>
                <div className="mb-3">
                    <label htmlFor="temperature-input" className="form-label">Temperature</label>
                    <input type="number" className="form-control w-25" id="temperature-input" placeholder="Input temperature" required></input>
                </div>
                <div className="mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="celsius" defaultChecked></input>
                    <label className="form-check-label" htmlFor="celsius">Celsius</label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="fahrenheit"></input>
                <label className="form-check-label" htmlFor="fahrenheit">Fahrenheit</label>
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="relative-humidity" className="form-label">Relative Humidity - %</label>
                <input type="number" className="form-control w-25" id="relative-humidity" placeholder="Input humidity" min="1" max = "100" required></input>
                </div>
                <button type="submit" className="btn btn-primary">Calculate</button>
            </form>
            <div id="heat-index-results"></div>
        </div>
    )
}

export default HeatIndexCalculator;