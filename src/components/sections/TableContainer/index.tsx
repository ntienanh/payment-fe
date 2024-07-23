import { Table, TableProps } from 'antd'

interface ITableContainerProps extends TableProps {
  defaultPageSize?: number
  pageSizeOptions?: string[]
}

const TableContainer = (props: ITableContainerProps) => {
  const { defaultPageSize = 5, pageSizeOptions = ['5', '10', '20', '30'], ...rest } = props || {}

  return (
    <Table
      pagination={{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        showSizeChanger: true,
        showTotal: (val) => (
          <p>
            <span className="font-bold">{val || '0'}</span>&nbsp;columns in total
          </p>
        ),
        pageSizeOptions: pageSizeOptions
      }}
      {...rest}
      bordered
    />
  )
}

export default TableContainer
