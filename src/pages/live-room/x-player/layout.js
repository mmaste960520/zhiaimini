export default class Layouter {
  constructor (containerWidth, containerHeight) {
    this.containerWidth = containerWidth
    this.containerHeight = containerHeight
  }

  getSize (totalUser) {
    let videoContainerHeight = this.containerHeight
    let videoContainerWidth = this.containerWidth
    switch (totalUser) {
      case 0:
        return []
      case 1:
        return [
          {
            x: 0,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight
          }
        ]
      case 2:
        return [
          {
            x: 0,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight
          },
          {
            x: videoContainerWidth / 2,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight
          }
        ]
      case 3:
        return [
          {
            x: 0,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight
          },
          {
            x: videoContainerWidth / 2,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 2
          },
          {
            x: videoContainerWidth / 2,
            y: videoContainerHeight / 2,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 2
          }
        ]
      case 4:
        return [
          {
            x: 0,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 2
          },
          {
            x: videoContainerWidth / 2,
            y: 0,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 2
          },
          {
            x: 0,
            y: videoContainerHeight / 2,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 2
          },
          {
            x: videoContainerWidth / 2,
            y: videoContainerHeight / 2,
            width: videoContainerWidth / 2,
            height: videoContainerHeight / 2
          }
        ]
    }
  }
}
