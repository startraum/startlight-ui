import React from 'react'
import GA from 'react-ga'
import styled from 'styled-components'
import Light from './Light'
import connect, { LightWithChange } from '../lightState'
import Credits from '../Credits'

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  min-height: 100%;
  position: relative;
  padding-bottom: 15px;
  box-sizing: border-box;
`
const Placeholder = styled.p`
  color: rgba(230,230,230,.3);
  margin: 0;
  font-weight: 400;
  font-size: 50px;
  text-align: center;
`

GA.initialize([{
  trackingId: 'UA-108452440-2',
}])
GA.set({ anonymizeIp: true })
GA.pageview(window.location.pathname + window.location.search)

export default connect((props: { lights: LightWithChange[], advanced: boolean, admin: boolean, accessToken: string }) => (
  <Section>
    {!props.accessToken && <Placeholder>Access expired. Please scan the QR-Code again …</Placeholder>}
    {props.accessToken && props.lights.length <= 0 && <Placeholder>no lights available</Placeholder>}
    {props.accessToken && props.lights.map(light => (
      <Light
        offline={Date.now() - light.lastUpdate >= parseInt(process.env.OFFLINE_TIME_THRESHOLD || '600000', 10)}
        advanced={props.advanced}
        admin={props.admin}
        key={light.id}
        {...light}
      />
    ))}
    <Credits />
  </Section>
))
