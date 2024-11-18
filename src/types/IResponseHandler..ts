export default interface IResponseHandler<T, E> {
  sucess: T | null
  error: E | null
}
