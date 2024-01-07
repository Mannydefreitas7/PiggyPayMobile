// import MockDate from 'mockdate'

// const FRAME_TIME = 10

// /**
//  * Advances forward one frame worth for animations.
//  */
// const advanceOneFrame = (): void => {
//   const now = Date.now()
//   MockDate.set(new Date(now + FRAME_TIME))
//   jest.advanceTimersByTime(FRAME_TIME)
// }

// /**
//  * Advances time forward the specified milliseconds, where 10ms classes
//  * as a frame.
//  * @param msToAdvance {number}
//  */
// export const expediteTime = (msToAdvance: number = FRAME_TIME): void => {
//   for (let i = 0; i < msToAdvance; i += FRAME_TIME) advanceOneFrame()
// }
