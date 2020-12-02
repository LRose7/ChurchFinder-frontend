import React, { Component } from 'react';
import ChurchDataService from '../services/church.service';


class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchChurch = this.onChangeSearchChurch.bind(this);
        this.retrieveChurches = this.retrieveChurches.bind(this);
        this.searchChurch = this.searchChurch.bind(this);

        this.state = {
            churches: [],
            currentIndex: -1,
            searchChurch: ''
        };
    }

    componentDidMount() {
        this.retrieveChurches();
    }

    onChangeSearchChurch = (e) => {
        console.log(e.target.value);
        const searchChurch = e.target.value;

        this.setState({
            searchChurch: searchChurch
        });
    }

    //Retrieves all churches from the database and lists them under the map
    retrieveChurches() {
        ChurchDataService.getAll()
            .then(response => {
                this.setState({
                    churches: response.data
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //Searches for churches by denomination
    searchChurch() {
        ChurchDataService.findByDenomination(this.state.searchChurch)
            .then(response => {
                this.setState({
                    churches: response.data
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { searchChurch, churches, currentIndex } = this.state;
        return (
            <div id='churchsearch-display'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Search by denomination'
                    value={searchChurch}
                    onChange={this.onChangeSearchChurch}
                />
                <button
                    type='button'
                    onClick={this.searchChurch}>Search</button>
                <div>
                    <h1>Churches List</h1>
                    <ul className='list-group'>
                        {churches && churches.map((church, index) => (
                            <li
                                className={
                                    'list-group-item' +
                                    (index === currentIndex ? 'active' : '')
                                }
                                key={index}>
                                <h3>{church.Name}</h3>
                                {church.Mailing_One}<br></br>
                                {church.City}, {church.State}, {church.PostalCode} <br></br>
                                {church.Denomination}<br></br>
                                <a
                                    className='church-links'
                                    href={church.Web_URL}>{church.Web_URL} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SearchBox;