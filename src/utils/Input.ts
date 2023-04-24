export function callOnEnter (evt: React.KeyboardEvent<HTMLInputElement>, callback: () => void): void {
  if (evt.key === 'Enter') {
    callback()
  }
}
