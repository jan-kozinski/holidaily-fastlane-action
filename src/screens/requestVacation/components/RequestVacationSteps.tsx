import React, { useEffect } from 'react'
import { Analytics } from 'services/analytics'
import { AttachmentType } from 'types/holidaysDataTypes'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'
import { FormRequestVacation } from './FormRequestVacation'
import { SummaryRequestVacation } from './SummaryRequestVacation'

type RequestDataTypes = {
  description: string
  message: string
  photos: AttachmentType[]
  files: (AttachmentType & { name: string })[]
}

type ChangeRequestDataCallbackType = (currentData: RequestDataTypes) => RequestDataTypes

type StepsProps = {
  changeRequestData: F1<ChangeRequestDataCallbackType>
  removeAttachment: F1<string>
  showSentModal: F0
}

export const RequestVacationSteps = ({
  changeRequestData,
  removeAttachment,
  showSentModal,
}: StepsProps) => {
  const {
    step,
    setStep,
    sickTime,
    toggleSickTime,
    startDate,
    endDate,
    requestData,
    createdAt,
    setIsFormEmpty,
  } = useRequestVacationContext()

  useEffect(() => {
    Analytics().track('REQUEST_STEP_CHANGED', { step })
  }, [step])

  if (step === 0)
    return (
      <FormRequestVacation
        nextStep={() => setStep(1)}
        sickTime={sickTime}
        setIsFormEmpty={setIsFormEmpty}
        toggleSickTime={toggleSickTime}
        changeRequestData={changeRequestData}
        date={{ start: startDate, end: endDate }}
        photos={requestData.photos}
        files={requestData.files}
        removeAttachment={removeAttachment}
      />
    )
  if (step === 1)
    return (
      <SummaryRequestVacation
        description={requestData.description}
        isSick={sickTime}
        startDate={startDate}
        endDate={endDate}
        createdAt={createdAt}
        message={requestData.message}
        onNextPressed={showSentModal}
        attachments={[...requestData.photos, ...requestData.files]}
      />
    )
  return null
}
