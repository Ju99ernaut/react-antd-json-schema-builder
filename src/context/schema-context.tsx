import React, { PropsWithChildren, useContext, useState, useCallback } from 'react'

export const SchemaContext = React.createContext<{
  changes: string[]
  handlePushToChanges: (id: string) => void
  handleGetIsInChanges: (id: string) => boolean
  handleChangesIdKey: (oldKey: string, newKey: string) => void
  expandCollapseAll: string
  setExpandCollapseAll: (id: string) => void
  search: string
  setSearch: (query: string) => void
}>({
  changes: [],
  handlePushToChanges: _id => {},
  handleGetIsInChanges: _id => false,
  handleChangesIdKey: (_old, _new) => {},
  expandCollapseAll: '',
  setExpandCollapseAll: _id => {},
  search: '',
  setSearch: _query => {},
})

const SchemaProvider = ({ children }: PropsWithChildren) => {
  const [expandCollapseAll, setExpandCollapseAll] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [changes, setChanges] = useState<string[]>([])
  const handlePushToChanges = useCallback((id: string) => {
    setChanges(value => [...value, id])
  }, [])

  const handleChangesIdKey = useCallback(
    (oldkey: string, newKey: string) => {
      const isExist = changes.includes(oldkey)
      if (!isExist) return
      setChanges(value => {
        const removeExisting = value.filter(item => item !== oldkey)
        return [...removeExisting, newKey]
      })
    },
    [changes]
  )

  const handleGetIsInChanges = useCallback((id: string) => changes.includes(id), [changes])

  return (
    <SchemaContext.Provider
      value={{
        changes,
        handlePushToChanges,
        handleChangesIdKey,
        handleGetIsInChanges,
        expandCollapseAll,
        setExpandCollapseAll,
        search,
        setSearch,
      }}
    >
      {children}
    </SchemaContext.Provider>
  )
}

export const useSchemaContext = () => useContext(SchemaContext)

export default SchemaProvider
