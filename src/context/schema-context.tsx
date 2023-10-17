import React, { PropsWithChildren, useContext, useState } from 'react'

export const SchemaContext = React.createContext<{
  changes: string[]
  handlePushToChanges: (id: string) => void
  handleGetIsInChanges: (id: string) => boolean
  handleChangesIdKey: (oldKey: string, newKey: string) => void
}>({
  changes: [],
  handlePushToChanges: _id => {},
  handleGetIsInChanges: _id => false,
  handleChangesIdKey: (_old, _new) => {},
})

const SchemaProvider = ({ children }: PropsWithChildren) => {
  const [changes, setChanges] = useState<string[]>([])

  const handlePushToChanges = (id: string) =>
    setChanges(value => [...value, id])

  const handleChangesIdKey = (oldkey: string, newKey: string) => {
    const isExist = changes.includes(oldkey)
    if (!isExist) return
    setChanges(value => {
      const removeExisting = value.filter(item => item !== oldkey)
      return [...removeExisting, newKey]
    })
  }

  const handleGetIsInChanges = (id: string) => {
    const isInChanges = changes.includes(id)
    if (!isInChanges) return false
    setChanges(value => value.filter(item => item !== id))
    return true
  }

  return (
    <SchemaContext.Provider
      value={{
        changes,
        handlePushToChanges,
        handleChangesIdKey,
        handleGetIsInChanges,
      }}
    >
      {children}
    </SchemaContext.Provider>
  )
}

export const useSchemaContext = () => useContext(SchemaContext)

export default SchemaProvider
