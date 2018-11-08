'use strict'
import React from 'react';

class Race extends React.Component{
    render() {
        return (
            <div>
                <div className='container'>
                    <img src='/static/images/race_bg.png' className='img-fluid d-block w-100'/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-2 sidenav'>
                        </div>
                        <div className='col-sm-8' style={{paddingBottom: '50px'}}>
                            <div className='col-sm bg-danger'>
                                <p>EVENT NAME</p>
                                <p>EVENT DATE</p>
                                <button>REGISTRATION ACTION</button>
                            </div>
                            <div className='col-sm'>
                                <p className='text-center'>LATEST RACE</p>
                            </div>
                            <div className='col-sm text-center'>
                                <button type="button" class="btn btn-outline-primary">CHARITY</button>
                                <button type="button" class="btn btn-outline-primary">EVENT</button>
                                <button type="button" class="btn btn-outline-primary">ALL</button>
                            </div>
                            <div className='col-sm text-center'>
                                <div class="card" style={{width:'auto'}}>
                                    <img class="card-img-top" src="/static/images/race_bg.png" alt="Card image" style={{width:'100%'}}/>
                                        <div class="card-body">
                                            <h4 class="card-title">EVENT NAME</h4>
                                            <p class="card-text">EVENT DATE</p>
                                            <p class="card-text">EVENT PRICE</p>
                                            <button type="button" class="btn btn-outline-primary">ACTION</button>
                                        </div>
                                </div>
                                <div class="card" style={{width:'auto'}}>
                                    <img class="card-img-top" src="/static/images/race_bg.png" alt="Card image" style={{width:'100%'}}/>
                                        <div class="card-body">
                                            <h4 class="card-title">EVENT NAME</h4>
                                            <p class="card-text">EVENT DATE</p>
                                            <p class="card-text">EVENT PRICE</p>
                                            <button type="button" class="btn btn-outline-primary">ACTION</button>
                                        </div>
                                </div>
                            </div>
                            <div className='col-sm text-center'>
                                <button type="button" class="btn btn-outline-primary">See All</button>
                            </div>
                        </div>
                        <div className='col-sm-2'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Race;