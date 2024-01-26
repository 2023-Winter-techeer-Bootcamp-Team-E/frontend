import React, { useState } from 'react';
import styled from 'styled-components';
import LargeSketchbook from '../components/LargeSketchbook';


function TutorialPage(props) {

  return (
    <Case1Div>
      <WrapperLargeSketchbook>
        <LargeSketchbook />
      </WrapperLargeSketchbook>
      <SketDiv>
        {startP()}
        {WrapperarrowlbtnContent()}
      </SketDiv>
    </Case1Div>
  );
}

export default TutorialPage;
