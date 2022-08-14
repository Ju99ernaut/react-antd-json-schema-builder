import { useEffect, useRef, useState } from 'react'
import { Schema } from '../types'

const useUnsavedChanges = (data: Schema) => {
  const [isDirty, setDirty] = useState(false)

  const isFirstRender = useRef(true)

  const handleSetDirty = () => setDirty(true)

  const handleSetPristine = () => setDirty(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    handleSetDirty()
  }, [data])

  return { isDirty, handleSetDirty, handleSetPristine }
}

export default useUnsavedChanges
