import React, { Component } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';


// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const Example = () => (
  <Accordion>
    <AccordionItem>
      <AccordionItemTitle>
        <h3>Simple title</h3>
      </AccordionItemTitle>
      <AccordionItemBody>
        <p>Body content</p>
      </AccordionItemBody>
    </AccordionItem>
    <AccordionItem>
      <AccordionItemTitle>
        <h3>Complex title</h3>
      </AccordionItemTitle>
      <AccordionItemBody>
        <p>Body content</p>
      </AccordionItemBody>
    </AccordionItem>
  </Accordion>
);
const API = 'api/Questions';

class Typography extends Component {
  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
  }

  static renderForecastsTable(forecasts) {
    return (
      <div>
        {forecasts.map(hit =>
          <AccordionItem key={hit.questionId}>
            <AccordionItemTitle>
              <h3>{hit.text}</h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>Body content</p>
            </AccordionItemBody>
          </AccordionItem>
        )}
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Typography.renderForecastsTable(this.state.forecasts);
    return (
      <div className="animated fadeIn"> 
        <div className="card">
          <div className="card-header">
            Chapters
          </div>
          <div className="card-body">
            <div className="bd-example">
              <div>
                <Accordion>
                  {contents}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Typography;
