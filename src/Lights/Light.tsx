import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Color from 'color'
import Power from '../icons/Power'
import UnstyledColorWheel from './ColorWheel/index'

const lastColorCount = 4

const Wrapper = styled.div<{ on: boolean, colorWheelOpened: boolean }>`
  opacity: ${p => p.on ? 1 : 0.5};
  transition-duration: .3s;
  width: 100%;
  padding: 10px 15px 20px;
  margin: 25px 30px;
  border-radius: 20px;
  background-color: rgba(240, 240, 240, 0.15);
  max-width: 500px;
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
  position: relative;
  max-height: ${p => p.colorWheelOpened ? '450' : '150'}px;
  box-sizing: border-box;
  transition-delay: ${p => p.colorWheelOpened ? 0 : 0}s;
  overflow: hidden;
`
const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`
const Name = styled.h2`
  flex: 1;
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 32px;
`
const ColorDotContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const ColorDot = styled.button<{ active: boolean, color?: string, disabled?: boolean, invisible?: boolean }>`
  border-radius: 50%;
  ${p => p.active ? 'border: 5px solid rgba(254, 254, 254, 0.9);' : 'border: 0 solid transparent;'}
  outline: none;
  padding: 0;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  transition: border 0.3s;
  cursor: ${p => p.disabled ? 'auto' : 'pointer'};
  background: ${p => !p.invisible ? p.color || 'rgba(228, 228, 228, .1)' : 'none'};
  box-shadow: ${p => p.invisible ? 'none' : `0px 3px 20px 0 rgba(28, 28, 28, ${p.disabled ? '.1' : '.3'})`};
`
const ColorWheel = styled(UnstyledColorWheel)``
const activeStyle = css`
  height: 250px;
  margin-top: 20px;
  opacity: 1;
  pointer-events: all;
  ${ColorWheel} {
    transform: scale(1);
  }
`
const ColorWheelWrapper = styled.div<{ active: boolean }>`
  height: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  margin-top: 0;
  transition: opacity 0.3s ease ${p => p.active ? 0 : 0}s, height 0.3s ease ${p => p.active ? 0 : 0}s, margin-top 0.3s ease ${p => p.active ? 0 : 0}s;
  ${ColorWheel} {
    transition-duration: 0.3s;
    transition-delay: ${p => p.active ? 0 : 0}s;
    transform: scale(0.01);
  }
  ${p => p.active && activeStyle};
`
let bg: string | undefined
const getWheelBackgroundImage = (size: number) => {
  if (bg) return bg
  const canvas = document.createElement('canvas')
  canvas.width = size * 2
  canvas.height = size * 2
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  context.scale(2, 2)
  context.scale(2, 2)
  const x = size / 4 // Canvas center X (divided by 4 because of retina)
  const y = size / 4 // Canvas center Y (divided by 4 because of retina)
  const r = x // Canvas radius
  const d2r = Math.PI / 180 // Degrees to radians

  for (let angle = 0; angle <= 360; angle++) {
    const arc_start = -((angle + 90) * d2r)
    const arc_end = -((angle + 88) * d2r)

    // Draw shape
    context.beginPath()
    context.moveTo(x, y)
    context.arc(x, y, r, arc_start, arc_end, false)
    context.closePath()

    // Generate gradient for shape
    const gradient = context.createRadialGradient(x, y, 0, x, y, r)
    gradient.addColorStop(0.002, 'hsl(' + angle + ', 100%, 100%)')
    gradient.addColorStop(1, 'hsl(' + angle + ', 100%, 50%)')

    context.fillStyle = gradient
    context.fill()
  }
  bg = canvas.toDataURL('image/png', 1)
  return bg
}

const ColorWheelButton = styled(props => <ColorDot {...props} />).attrs({
  disabled: false,
})`
  background: url(${getWheelBackgroundImage(50)}) no-repeat;
  background-size: 100%;
`

export interface ColorType {
  hue: number
  lightness: number
}
export interface Type {
  id: string
  name: string
  hue: number
  lightness: number
  power: boolean
  intensity: number
  classes?: any
  lastColors: ColorType[]
}
export interface State {
  power: boolean
  intensity: number
  hue: number
  lightness: number
  colorWheelOpened: boolean,
}

export default class Light extends Component<Type, State> {
  public state = {
    power: this.props.power,
    intensity: this.props.intensity,
    hue: this.props.hue,
    lightness: this.props.lightness,
    colorWheelOpened: false,
  }

  public render() {
    return (
      <Wrapper on={this.state.power} colorWheelOpened={this.state.colorWheelOpened}>
        <NameWrapper>
          <Name>{this.props.name}</Name>
          <Power
            size={60}
            onClick={() => this.setState(state => ({ power: !state.power }))}
            on={this.state.power}
          />
        </NameWrapper>
        {this.renderColors()}
        <ColorWheelWrapper active={this.state.colorWheelOpened}>
          <ColorWheel
            hue={this.state.hue}
            lightness={this.state.lightness}
            onChange={(hue, lightness) => this.setState({ hue, lightness })}
            onClose={() => this.setState({ colorWheelOpened: false })}
          />
        </ColorWheelWrapper>
      </Wrapper>
    )
  }

  private setIntensity(intensity: number) {
    this.setState({
      intensity,
      power: intensity > 0,
    })
  }

  private isColorActive(color: { hue: number, lightness: number }) {
    return color.hue === this.state.hue && color.lightness === this.state.lightness
  }

  private renderColors() {
    return (
      <ColorDotContainer>
        <ColorWheelButton
          onClick={() => this.setState({ colorWheelOpened: true })}
          active={this.state.colorWheelOpened}
        />
        {[...(new Array(lastColorCount)).keys()].map((index: number) => {
          const color = this.props.lastColors[index]
          return (
            <ColorDot
              key={index}
              active={color && this.isColorActive(color)}
              color={color ? Color.hsl(color.hue, 100, color.lightness).hex() : ''}
              disabled={!color}
              onClick={color ? () => this.setState({ hue: color.hue, lightness: color.lightness }) : undefined}
            />
          )
        })}
      </ColorDotContainer>
    )
  }
}
