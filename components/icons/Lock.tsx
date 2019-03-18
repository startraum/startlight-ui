import React, { MouseEvent } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border: 0;
  padding: 0;
  margin: 0;
  margin-right: 10px;
  outline: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  svg {
    width: 100%;
    height: 100%;
    transition-duration: 0.2s;
  }
`

export interface LockProps {
  size?: number
  locked: boolean,
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void,
  className?: string
}

const Lock = ({ locked, onClick, className }: LockProps) => (
  <Button onClick={onClick} className={className}>
    <svg viewBox="0 0 500 500">
      {locked
        ? <path d="M131.889 150.061v63.597h-27.256c-20.079 0-36.343 16.263-36.343 36.342v181.711c0 20.078 16.264 36.34 36.343 36.34h290.734c20.078 0 36.345-16.262 36.345-36.34V250c0-20.079-16.267-36.342-36.345-36.342h-27.254v-63.597c0-65.232-52.882-118.111-118.112-118.111S131.889 84.828 131.889 150.061zm45.428 63.597v-63.597c0-40.157 32.525-72.685 72.683-72.685 40.158 0 72.685 32.528 72.685 72.685v63.597H177.317zm36.341 99.941c0-20.078 16.263-36.341 36.342-36.341s36.341 16.263 36.341 36.341c0 12.812-6.634 24.079-16.625 30.529 0 0 3.55 21.446 7.542 46.699a13.61 13.61 0 0 1-13.629 13.625h-27.258a13.608 13.608 0 0 1-13.627-13.625l7.542-46.699c-9.992-6.45-16.628-17.718-16.628-30.529z" />
        : <path d="M68.29 431.711c0 20.078 16.264 36.34 36.343 36.34h290.734c20.078 0 36.345-16.262 36.345-36.34V250c0-20.079-16.267-36.342-36.345-36.342h-218.05v-63.597c0-40.157 32.525-72.685 72.683-72.685 40.158 0 72.685 32.528 72.685 72.685v4.541c0 12.538 10.176 22.715 22.711 22.715 12.537 0 22.717-10.177 22.717-22.715v-4.541c0-65.232-52.882-118.111-118.112-118.111-65.24 0-118.111 52.879-118.111 118.111v63.597h-27.256c-20.079 0-36.343 16.263-36.343 36.342v181.711zm145.368-118.112c0-20.078 16.263-36.341 36.342-36.341s36.341 16.263 36.341 36.341c0 12.812-6.634 24.079-16.625 30.529 0 0 3.55 21.446 7.542 46.699a13.61 13.61 0 0 1-13.629 13.625h-27.258a13.608 13.608 0 0 1-13.627-13.625l7.542-46.699c-9.992-6.45-16.628-17.718-16.628-30.529z" />
      }
    </svg>
  </Button>
)

export default styled(Lock)`
  width: ${p => p.size || 50}px;
  height: ${p => p.size || 50}px;
  svg {
    fill: ${p => p.locked ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
  }
`