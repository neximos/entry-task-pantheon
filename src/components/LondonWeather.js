function LondonWeather() {
    return(
      <div className="weather-app">
        <form id="form-date" className="mb-3 text-center d-flex flex-column w-50 align-items-center mx-auto">
          <label htmlFor="inputDate" className="form-label">Please enter a date YYYY/MM/DD</label>
          <input type="text" className="form-control w-50 text-center" id="inputDate" placeholder="YYYY/MM/DD" required></input>
          <div id="emailHelp" className="form-text">e.g. 2018/04/30</div>
          <span className="msg"></span>
        <button type="submit" className="btn btn-primary mt-4">Get weather information</button>
        </form>
        <div className="d-block mx-auto text-center">
          <button id="chartBtn" className="btn btn-success m-2">Show chart</button>
          <button id="clearData" className="btn btn-danger">Clear table</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Datetime</th>
              <th scope="col">Weather State</th>
              <th scope="col">Temperature</th>
              <th scope="col">Air Pressure</th>
              <th scope="col">Humidity</th>
            </tr>
          </thead>
          <tbody id="table-body"></tbody>
        </table>
      </div>
    );
}
export default LondonWeather;