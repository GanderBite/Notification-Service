export interface ICreatePort<TUpdateDto> {
  update(dto: TUpdateDto): Promise<void>;
}
