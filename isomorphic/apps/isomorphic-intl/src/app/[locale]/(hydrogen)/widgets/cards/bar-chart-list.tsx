"use client";

import { ActionIcon, Title, Text } from "rizzui";
import cn from "@core/utils/class-names";
import WidgetCard from "@core/components/cards/widget-card";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CustomTooltip } from "@core/components/charts/custom-tooltip";
import { chartData, widgetData } from "@/data/card-widgets-data";
import { useTranslations } from "next-intl";

export default function BarChartList({ className }: { className?: string }) {
  const t = useTranslations("common");

  return (
    <>
      {widgetData.map((item) => (
        <WidgetCard
          key={item.name}
          title={t(item.name)}
          description={t("text-widget-description")}
          rounded="lg"
          action={
            <ActionIcon
              variant="outline"
              rounded="full"
            >
              <PiSlidersHorizontalDuotone className="h-auto w-5" />
            </ActionIcon>
          }
          descriptionClassName="text-gray-500 mt-1.5"
          className={cn(className)}
        >
          <div className="mt-5 grid w-full grid-cols-1 justify-around gap-6 @sm:py-2 @7xl:gap-8">
            <div className="grid grid-cols-2 gap-5">
              {item.stat.map((stat) => (
                <div
                  key={stat.title}
                  className="flex items-center"
                >
                  <div
                    className={cn(
                      "me-3.5 flex h-10 w-10 items-center justify-center rounded-md bg-opacity-10 p-[9px]",
                      stat.bgColor,
                      stat.textColor
                    )}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <Text className="mb-1 text-gray-600">{t(stat.title)}</Text>
                    <Title
                      as="h6"
                      className="font-semibold"
                    >
                      {stat.metric}
                    </Title>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-72 w-full @sm:pt-3">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={chartData}
                  margin={{
                    left: -30,
                  }}
                  barSize={24}
                >
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    type="natural"
                    dataKey="bounceRate"
                    stroke={item.color}
                    fill={item.color}
                    strokeWidth={2}
                    fillOpacity={0.1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </WidgetCard>
      ))}
    </>
  );
}
