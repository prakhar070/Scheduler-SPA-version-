class Interview < ApplicationRecord
    #an interview must have a column for an interviewer_id, i.e the user who created that interview
    #we can say something like @interview.interviewer
    belongs_to :interviewer, :class_name => "User"

    #an interview has many participants which belong to the class User
    #we can say something like @interview.participants
    has_and_belongs_to_many :participants, :class_name => "User"

    #validations
    validate :date_must_make_sense
    validate :members_available
    validates :title, presence: true
    validates :starttime, presence: true
    validates :endtime, presence: true
    #an interview should have minimum of one participant
    validates :participants, :length => {:minimum => 1, :message=>"At least one participant" }
    
    #a class function that fetches interviews with a particular date
    def self.with_date(date)
        where("date(starttime) == ? OR date(endtime) == ?", date, date)
    end

    #this function checks if any of the participants of the interview is busy at the scheduled time
    def members_available
        self.participants.each do |participant|
            if id.nil?
                clash = participant.interviews_created.where("(((starttime BETWEEN ? AND ? ) OR (starttime < ? AND endtime > ? ) OR (endtime BETWEEN ? AND ?)) )", starttime,endtime,starttime,endtime,starttime,endtime)
                if clash.exists?
                    errors.add(:participants, "#{participant.firstname} has another interview this time")
                    return
                end
                clash = participant.interviews_participated.where("(((starttime BETWEEN ? AND ? ) OR (starttime < ? AND endtime > ? ) OR (endtime BETWEEN ? AND ?)) )", starttime,endtime,starttime,endtime,starttime,endtime)
                if clash.exists?
                    errors.add(:participants, "#{participant.firstname} has another interview this time")
                    return
                end
            else
                clash = participant.interviews_created.where("((id != ?) AND ((starttime BETWEEN ? AND ? ) OR (starttime < ? AND endtime > ? ) OR (endtime BETWEEN ? AND ?)) )",id, starttime,endtime,starttime,endtime,starttime,endtime)
                if clash.exists?
                    errors.add(:participants, "#{participant.firstname} has another interview this time")
                    return
                end
                clash = participant.interviews_participated.where("((id != ?) AND ((starttime BETWEEN ? AND ? ) OR (starttime < ? AND endtime > ? ) OR (endtime BETWEEN ? AND ?)) )",id, starttime,endtime,starttime,endtime,starttime,endtime)
                if clash.exists?
                    errors.add(:participants, "#{participant.firstname} has another interview this time")
                    return
                end
            end

        end
    end

    #this function ensures that the start and the end times must be different and the date must not be from the past
    def date_must_make_sense
        if starttime.present? and endtime.present?  and starttime >= endtime
            errors.add(:starttime, "ensure that the starttime is less than the endtime of the interview")
        elsif starttime.present? && starttime <= (Time.current + 19800)
            errors.add(:starttime, "you are trying to schedule an interview in the past")
        end
    end
end
