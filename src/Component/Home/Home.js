import React, { useEffect } from "react";
import "./Home.css";
import Base from "../../Base/Base";
import img from "../../Images/a.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate=useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      navigate("/",{replace:true})
    }
  })
  return (
    <div id="home">
      <Base>
        <div id="home-container">
          <div className="milkshake">
            <h3>MILKSHAKES</h3>
            <div id="item-container">
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>
            </div>
          </div>
          <div className="sandwhitchs">
            <h3>SANDWHITCHES</h3>
            <div id="item-container">
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>
            </div>
          </div>
          <div className="sandwhitchs">
            <h3>STARTERS</h3>
            <div id="item-container">
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>{" "}
              <div id="item-box">
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>VANNILA MILKSHAKE</h6>
                  <p>REMOVE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
