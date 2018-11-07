'use strict'
import React from 'react';

var name = "";
function SetName(nm){
    name = nm;
}

class Home extends React.Component{
    render() {
        const user = name;
        return (
        <div>
            <div id="carousels" class="carousel slide" data-ride="carousel">
                <ul class="carousel-indicators">
                    <li data-target="#carousels" data-slide-to="0" class="active"></li>
                    <li data-target="#carousels" data-slide-to="1"></li>
                    <li data-target="#carousels" data-slide-to="2"></li>
                </ul>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="/static/images/web_banner_homepage_01.jpg" alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/static/images/web_banner_homepage_02.jpg" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/static/images/web_banner_homepage_03.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carousels" data-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#carousels" data-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </a>
            </div>
        <div class="container-fluid text-center">
            <div className='row content'>
                <div className='col-sm-2 sidenav'>
                </div>
                <div className='col-sm-8text-left'>
                    <div></div>
                </div>
                <div className='col-sm-2 sidenav'>
                </div>
            </div>
        </div>
      </div>
      );
    }
}

export { Home, SetName}