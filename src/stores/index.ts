import { createContext, useContext } from 'react'
import { configure, observable } from 'mobx'

import userStore from './User'
import usersStore from './Users'
import wheatherStore from './Weather'
import modalStore from './Modal'

configure({ enforceActions: 'observed' })

class RootStore {
  @observable usersStore = usersStore
  @observable userStore = userStore
  @observable wheatherStore = wheatherStore
  @observable modalStore = modalStore

}

const rootStore = new RootStore()

export const StoreContext = createContext<RootStore>(rootStore)

export const useStore = (): RootStore => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export default new RootStore()
