'use strict'

import { Flex, Link } from 'smbls'

export const Footer = {
  props: {
    padding: 'Z B',
    order: 9
  }
}

export const SquareComponent = {
  props: {
    shape: 'square',
    width: 'C',
    height: 'C',
    round: 'Z',

    background: '#E8F1FF',
    '.isSelected': {
      background: '#3D7BD9'
    }

  },
  state: {
    row: 1,
    col: 1
  },

  on: {
    click: (event, element, state) => {
      state.parent.parent.update({ selected: [state.row, state.col] })
    }
  }
}

export const CardComponent = {
  extend: Flex,
  props: {
    flow: 'column',
    shape: 'square',
    round: 'A',
    padding: 'A B',

    background: 'rgba(250,250,250,1)'
  }
}

export const RowComponent = {
  extend: Flex,
  props: {
    flow: 'row',
    gap: 'X'
  },
  state: {
    number_of_cols: 8,
    row_number: -1
  },

  childExtend: {
    extend: SquareComponent
  },
  $stateCollection: ({ state }) => {
    return Array(state.number_of_cols).fill(0).map((value, index) => {
      return {
        row: state.row_number,
        col: index,
        isSelected: state.parent.selected[0] >= state.row_number && state.parent.selected[1] >= index
      }
    })
  }
}

export const GridSelector = {
  CardComponent: {
    H5: { text: 'Grid Selection', color: 'black', alignSelf: 'start' },
    props: {
      alignItems: 'center',
      gap: 'B'
    },

    state: {
      number_of_rows: 16,
      number_of_cols: 8,
      selected: [-1, -1]
    },

    CardComponent: {

      props: { background: 'white', gap: 'X' },

      childExtend: {
        extend: RowComponent
      },
      $stateCollection: ({ state }) => {
        return Array(state.number_of_rows).fill(0).map((value, index) => {
          return {
            number_of_cols: state.number_of_cols,
            row_number: index
          }
        })
      }
    },

    Footer: {
      extend: Flex,
      props: {
        flow: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'B'
      },
      SelectionCoordinates: {
        text: (element, state) => {
          if (state.selected[0] !== -1) {
            const row = state.selected[0] + 1
            const col = state.selected[1] + 1
            return 'Selection coordinates: ' + row + ',' + col
          }
          return 'Selection coordinates: '
        },
        color: 'black'
      },
      TotalCellsSelected: {
        text: (element, state) => {
          if (state.selected[0] !== -1) {
            const row = state.selected[0] + 1
            const col = state.selected[1] + 1
            return 'Total cells selected: ' + row * col
          }
          return 'Total cells selected: '
        },
        color: 'black'
      }
    }
  }
}
