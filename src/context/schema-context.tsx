import React, { PropsWithChildren, useContext, useState, useCallback } from 'react'

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
  console.log('Schema provider')
  const handlePushToChanges = useCallback((id: string) => {
    console.log('handle push to change')
    setChanges(value => [...value, id])
  }, [])

  const handleChangesIdKey = useCallback(
    (oldkey: string, newKey: string) => {
      console.log('handle changesIdKey')
      const isExist = changes.includes(oldkey)
      if (!isExist) return
      setChanges(value => {
        const removeExisting = value.filter(item => item !== oldkey)
        return [...removeExisting, newKey]
      })
    },
    [changes]
  )

  const handleGetIsInChanges = useCallback(
    (id: string) => {
      console.log('handle getIsInChanges')
      const isInChanges = changes.includes(id)
      if (!isInChanges) return false
      setChanges(value => value.filter(item => item !== id))
      return true
    },
    [changes]
  )

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
