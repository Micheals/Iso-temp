"use client";

import { useMemo, useState } from "react";
import { useColumn } from "@core/hooks/use-column";
import { getColumns } from "@/app/shared/account-settings/billing-history/columns";
import { useTable } from "@core/hooks/use-table";
import { Button } from "rizzui";
import TableFooter from "@/app/shared/table-footer";
import ControlledTable from "@/app/shared/controlled-table";
import { exportToCSV } from "@core/utils/export-to-csv";
import { useTranslations } from "next-intl";

export default function BillingHistoryTable({
  className,
  data,
}: {
  className?: string;
  data: any[];
}) {
  const [pageSize, setPageSize] = useState(10);
  const t = useTranslations();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const {
    isLoading,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable(data, pageSize, data);

  const columns = useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
        t,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      handleRowSelect,
      handleSelectAll,
    ]
  );
  const { visibleColumns } = useColumn(columns);

  const selectedData = data.filter((item) => selectedRowKeys.includes(item.id));
  function handleExportData() {
    exportToCSV(
      selectedData,
      "Title,Amount,Date,Status,Shared",
      `billing_history_${selectedData.length}`
    );
  }

  return (
    <div className={className}>
      <ControlledTable
        isLoading={isLoading}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        scroll={{ x: 1300 }}
        variant="modern"
        rowKey={(record) => record.id}
        className="text-sm"
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button
              size="sm"
              onClick={() => handleExportData()}
              className="dark:bg-gray-300 dark:text-gray-800"
            >
              {t("common.text-download")} {selectedRowKeys.length}{" "}
              {selectedRowKeys.length > 1
                ? t("table.table-text-files")
                : t("table.table-text-file")}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
