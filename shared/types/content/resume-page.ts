import type { ResumeContact } from '#shared/types/content/resume-contact'
import type { ResumeExperience } from '#shared/types/content/resume-experience'
import type { ResumeSkillGroup } from '#shared/types/content/resume-skill-group'

export type ResumePage = {
  name: string
  contact: ResumeContact
  summary: string
  skills: ResumeSkillGroup[]
  experience: ResumeExperience[]
}
